"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  firebaseSignOut,
  onAuthStateChanged,
  FirebaseUser,
  isFirebaseConfigured,
} from "@/lib/firebase";

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAdmin: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isFirebaseLive: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name?: string) => Promise<void>;
  signInAsAdmin: () => void;
  signInAsGuest: () => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Monitor Firebase auth state or restore local session
  useEffect(() => {
    // If Firebase is configured with real keys, listen to auth state
    if (isFirebaseConfigured) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          const isAdminUser =
            firebaseUser.email?.toLowerCase().includes("admin") ||
            firebaseUser.email?.toLowerCase().endsWith("@promz.ai") ||
            firebaseUser.email?.toLowerCase() === "chiru@promz.ai";

          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "User",
            photoURL: firebaseUser.photoURL,
            isAdmin: Boolean(isAdminUser),
          });
        } else {
          // Check local fallback
          checkLocalSession();
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      checkLocalSession();
      setLoading(false);
    }
  }, []);

  const checkLocalSession = () => {
    try {
      const saved = localStorage.getItem("promz_user_session");
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  };

  const saveLocalSession = (profile: UserProfile | null) => {
    setUser(profile);
    if (profile) {
      localStorage.setItem("promz_user_session", JSON.stringify(profile));
    } else {
      localStorage.removeItem("promz_user_session");
    }
  };

  const signInWithGoogle = async () => {
    if (isFirebaseConfigured) {
      const res = await signInWithPopup(auth, googleProvider);
      const u = res.user;
      const isAdminUser =
        u.email?.toLowerCase().includes("admin") ||
        u.email?.toLowerCase().endsWith("@promz.ai") ||
        u.email?.toLowerCase() === "chiru@promz.ai";

      const profile: UserProfile = {
        uid: u.uid,
        email: u.email,
        displayName: u.displayName || "Google User",
        photoURL: u.photoURL,
        isAdmin: Boolean(isAdminUser),
      };
      saveLocalSession(profile);
    } else {
      // Simulated instant Google Sign-In
      const profile: UserProfile = {
        uid: `google-${Date.now()}`,
        email: "chiru@promz.ai",
        displayName: "Chiranjeevi (Admin)",
        photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        isAdmin: true,
      };
      saveLocalSession(profile);
    }
    setIsAuthModalOpen(false);
  };

  const signInWithEmail = async (email: string, pass: string) => {
    if (isFirebaseConfigured) {
      const res = await signInWithEmailAndPassword(auth, email, pass);
      const u = res.user;
      const isAdminUser =
        u.email?.toLowerCase().includes("admin") ||
        u.email?.toLowerCase().endsWith("@promz.ai") ||
        u.email?.toLowerCase() === "chiru@promz.ai";

      const profile: UserProfile = {
        uid: u.uid,
        email: u.email,
        displayName: u.displayName || email.split("@")[0],
        photoURL: null,
        isAdmin: Boolean(isAdminUser),
      };
      saveLocalSession(profile);
    } else {
      const isAdminUser =
        email.toLowerCase().includes("admin") ||
        email.toLowerCase().endsWith("@promz.ai") ||
        email.toLowerCase() === "chiru@promz.ai";

      const profile: UserProfile = {
        uid: `email-${Date.now()}`,
        email,
        displayName: email.split("@")[0],
        photoURL: null,
        isAdmin: Boolean(isAdminUser),
      };
      saveLocalSession(profile);
    }
    setIsAuthModalOpen(false);
  };

  const signUpWithEmail = async (email: string, pass: string, name?: string) => {
    if (isFirebaseConfigured) {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      const u = res.user;
      const profile: UserProfile = {
        uid: u.uid,
        email: u.email,
        displayName: name || email.split("@")[0],
        photoURL: null,
        isAdmin: false,
      };
      saveLocalSession(profile);
    } else {
      const profile: UserProfile = {
        uid: `new-${Date.now()}`,
        email,
        displayName: name || email.split("@")[0],
        photoURL: null,
        isAdmin: false,
      };
      saveLocalSession(profile);
    }
    setIsAuthModalOpen(false);
  };

  const signInAsAdmin = () => {
    const adminProfile: UserProfile = {
      uid: "admin-chiru-master",
      email: "admin@promz.ai",
      displayName: "Chiranjeevi (Lead Admin)",
      photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      isAdmin: true,
    };
    saveLocalSession(adminProfile);
    setIsAuthModalOpen(false);
  };

  const signInAsGuest = () => {
    const guestProfile: UserProfile = {
      uid: `guest-${Date.now()}`,
      email: "creator@promz.ai",
      displayName: "Creative Director",
      photoURL: null,
      isAdmin: false,
    };
    saveLocalSession(guestProfile);
    setIsAuthModalOpen(false);
  };

  const signOut = async () => {
    if (isFirebaseConfigured) {
      await firebaseSignOut(auth).catch(() => {});
    }
    saveLocalSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isFirebaseLive: isFirebaseConfigured,
        isAuthModalOpen,
        setIsAuthModalOpen,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signInAsAdmin,
        signInAsGuest,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
