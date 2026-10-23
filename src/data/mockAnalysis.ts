import { DemoVideoPreset } from "@/types/analysis";

export const DEMO_PRESETS: DemoVideoPreset[] = [
  {
    id: "preset-cyberpunk-chase",
    title: "Neo-Shinjuku High-Speed Pursuit",
    category: "Sci-Fi / Action Cinema",
    duration: "00:18.40",
    badge: "Fast Paced • 60 FPS • Multi-Cut",
    description: "Anamorphic drone chase through rain-slicked neon alleyways with aggressive camera roll and volumetric fog.",
    previewGradient: "from-cyan-950 via-slate-900 to-rose-950",
    accentColor: "#ff4500",
    data: {
      videoId: "preset-cyberpunk-chase",
      title: "Neo-Shinjuku High-Speed Pursuit",
      durationSeconds: 18.4,
      totalScenes: 4,
      resolution: "3840x2160 (4K DCI)",
      fps: 60,
      aspectRatio: "2.39:1 Anamorphic",
      dominantColorPalette: ["#050814", "#0df2c8", "#ff0055", "#ffd200", "#1a2238"],
      confidenceScore: 0.96,
      modeAScript: {
        overallMood: "Adrenaline-fueled, dystopian noir, oppressive atmosphere with electric pacing.",
        pacing: "Fast tempo, rapid cut intervals averaging 4.6 seconds, accelerating in scene 3.",
        scenes: [
          {
            id: "scene-1",
            sceneNumber: 1,
            timecodeStart: "00:00:00.00",
            timecodeEnd: "00:00:04.20",
            durationSeconds: 4.2,
            visualSummary: "Low-angle high-speed tracking shot following a sleek matte-black autonomous pursuit drone carving through misty cyber-alleyways.",
            subjectsAndObjects: ["Twin-rotor heavy drone with glowing crimson optical sensor", "Holographic Kanji billboard flicker", "Wet asphalt reflections"],
            environment: "Narrow canyon between hyper-dense modular skyscrapers, dripping rainwater, overhead neon tubing.",
            lightingAndAtmosphere: "Low-key key light from cyan holographic signs, crimson rim light reflecting off wet tarmac. Volumetric mist.",
            cameraFraming: "Extreme Low Angle, Close-Up on drone chassis, 24mm wide-angle anamorphic lens.",
            cameraMovement: "Rapid forward push-in with 15-degree Dutch angle roll following lateral drone yaw.",
            dialogue: [
              {
                speaker: "DISPATCH AI (VO)",
                text: "Target unit vector confirmed. Perimeter locks engaged at Sector 9.",
                confidence: 0.98
              }
            ],
            audioNotes: {
              music: "140 BPM aggressive industrial synth bass, distorted 808 sub-boom on frame 01.",
              foleyAndSfx: ["High-frequency turbine whine", "Wet tire spray hiss", "Distant urban sirens"],
              vocalTone: "Synthesized vocoded female dispatch voice, flat robotic cadence."
            },
            onScreenText: ["SECTOR // 09-NORTH", "REC // 60.00 FPS"],
            transitionToNext: "Hard whip-pan cut to vehicle interior."
          },
          {
            id: "scene-2",
            sceneNumber: 2,
            timecodeStart: "00:00:04.20",
            timecodeEnd: "00:00:08.50",
            durationSeconds: 4.3,
            visualSummary: "Interior vehicle cockpit. Driver hands in haptic feedback carbon-fiber gloves gripping steering yoke, eye reflections on windshield HUD.",
            subjectsAndObjects: ["Female protagonist pilot with cybernetic iris implant", "Augmented reality HUD with vector wireframes", "Rain streaks on polarized canopy"],
            environment: "High-tech interceptor cockpit, glowing orange instrument arrays.",
            lightingAndAtmosphere: "Flickering amber dash indicators, intermittent blue strobes from pursuer overhead.",
            cameraFraming: "Medium Tight Profile Shot, shallow depth of field (f/1.4), rack focus to exterior mirror.",
            cameraMovement: "Micro handheld camera vibration simulating road turbulence and G-force inertia.",
            dialogue: [
              {
                speaker: "PILOT",
                text: "Cutting primary thrusters. Shifting to manual kinetic.",
                confidence: 0.94
              }
            ],
            audioNotes: {
              music: "Layered arpeggiated sawtooth synthesizer swells in stereo channels.",
              foleyAndSfx: ["Pneumatic gear latch click", "Heartbeat pulse thumping in cockpit reverb", "Rain pounding glass"],
              vocalTone: "Breathy, tense, focused female vocal delivery."
            },
            onScreenText: ["AUX POWER: 84%", "WARNING: PROXIMITY CRITICAL"],
            transitionToNext: "Flash frame lighting transition to exterior wide."
          },
          {
            id: "scene-3",
            sceneNumber: 3,
            timecodeStart: "00:00:08.50",
            timecodeEnd: "00:00:13.80",
            durationSeconds: 5.3,
            visualSummary: "Overhead crane shot looking straight down onto intersection as the interceptor drifts 180 degrees through a blinding sheet of water.",
            subjectsAndObjects: ["Matte-black aerodynamic interceptor vehicle", "Three pursuing security hovercrafts", "Shattered neon glass shards"],
            environment: "Flooded asphalt plaza flanked by massive brutalist corporate towers.",
            lightingAndAtmosphere: "Harsh white xenon searchlights slicing diagonally across dark water reflections.",
            cameraFraming: "Bird's Eye Top-Down Wide, 35mm cinema lens, deep depth of field.",
            cameraMovement: "Smooth vertical descent crane arm with counter-clockwise rotation matching vehicle drift trajectory.",
            audioNotes: {
              music: "Percussion drop into heavy broken beat, high-pass filter opens up completely.",
              foleyAndSfx: ["Tire friction screech on wet pavement", "Water splash explosion wave", "Sonic boom crack"],
              vocalTone: "No spoken dialogue. Breath compression sound only."
            },
            onScreenText: [],
            transitionToNext: "Smash cut on kinetic impact."
          },
          {
            id: "scene-4",
            sceneNumber: 4,
            timecodeStart: "00:00:13.80",
            timecodeEnd: "00:00:18.40",
            durationSeconds: 4.6,
            visualSummary: "Hero slow-motion hero profile tracking as the vehicle boosts into an underground tunnel entrance, exhaust flare blooming into lens flare.",
            subjectsAndObjects: ["Twin plasma exhaust nozzles firing blue-violet flame", "Wet concrete tunnel portal", "Smoke trails"],
            environment: "Subterranean maintenance transit conduit with receding yellow sodium hazard lamps.",
            lightingAndAtmosphere: "Warm sodium vapor orange ambient light punctuated by intense violet plasma flare.",
            cameraFraming: "Three-Quarter Rear Low Tracking Shot, cinematic wide, anamorphic horizontal streak flare.",
            cameraMovement: "High-speed chase vehicle mount, dynamic parallax between foreground pylons and car.",
            dialogue: [
              {
                speaker: "RADIO VO (STATIC)",
                text: "Target lost in lower conduit... re-establishing lock.",
                confidence: 0.91
              }
            ],
            audioNotes: {
              music: "Sub-bass roll-off into atmospheric sustained drone with lingering reverb tail.",
              foleyAndSfx: ["Rocket thruster roar", "Doppler shift whoosh as tunnel is entered", "Radio squelch"],
              vocalTone: "Heavily distorted and clipped radio transmission."
            },
            onScreenText: ["TRANSIT TUBE 4-B // CLEARANCE RESTRICTED"],
            transitionToNext: "Fade to black on tunnel darkness."
          }
        ]
      },
      modeBPrompt: {
        runwayGen3: {
          targetModel: "Runway Gen-3",
          masterPrompt: "Cinematic 2.39:1 anamorphic film footage of a high-speed cyberpunk chase through rain-drenched Neo-Tokyo alleyways. Low-angle tracking shot following a sleek matte-black pursuit drone with glowing crimson optics carving through dense steam and holographic cyan billboards. Volumetric lighting, wet asphalt reflections, hyper-realistic water spray, Kodak Vision3 500T color grade, sharp motion blur, dynamic 60fps pacing, authentic anamorphic horizontal lens flare, Arri Alexa Mini LF.",
          negativePrompt: "low resolution, 3d render look, cartoon, plastic textures, daytime, dry streets, flat lighting, jittery camera, oversaturated colors, morphing artifacts",
          styleKeywords: ["Cyberpunk Cinema", "Anamorphic 2.39:1", "Kodak Vision3 500T", "Volumetric Neon Fog", "Rain Reflections", "High-Octane Dynamic Pan"],
          cameraDirectives: "Low-angle dynamic tracking push-in with subtle 15-degree Dutch angle roll, stabilizing on vehicle centroid.",
          lightingDirective: "High contrast chiaroscuro: cyan neon key with secondary crimson kicker rim light across wet surfaces.",
          compositionDirective: "Leading lines created by towering urban architecture converging towards central vanishing point.",
          motionPacing: "High kinetic velocity with crisp frame-to-frame motion continuity and zero warping.",
          aspectRatio: "21:9 (2.39:1)",
          recommendedFps: 60,
          temporalConsistencyHints: ["Lock vehicle geometry between frames", "Preserve persistent rain droplet streaks across glass", "Consistent neon color temperature"]
        },
        openaiSora: {
          targetModel: "OpenAI Sora",
          masterPrompt: "A hyper-detailed cinematic sequence shot on 35mm anamorphic lenses: An autonomous matte-black drone sweeps inches above flooded city asphalt in a futuristic midnight metropolis. Rain pours continuously, creating detailed ripples and water splashes illuminated by glowing cyan and magenta neon advertisements. The camera executes a continuous, breathless ground-level tracking maneuver, tilting up smoothly as the drone accelerates past towering brutalist megastructures into a dimly lit tunnel. Real-world physics, fluid water splash dynamics, photorealistic atmospheric haze.",
          styleKeywords: ["Photorealistic 35mm", "Physically Accurately Simulated Rain", "Complex City Reflections", "Chiaroscuro Neon", "Editorial Action"],
          cameraDirectives: "Smooth continuous gimbal tracking, low ground-skimming altitude, matching vehicle velocity curves.",
          lightingDirective: "Multiple ambient colored light sources bouncing off specular puddles, harsh directional headlights.",
          compositionDirective: "Rule of thirds vehicle alignment transitioning to centered symmetrical tunnel exit.",
          motionPacing: "Accelerating speed ramp from standard 24fps equivalent to smooth 60fps high kinetic rush.",
          aspectRatio: "16:9 or 21:9",
          recommendedFps: 60,
          temporalConsistencyHints: ["Maintain consistent rainfall velocity", "Keep billboard Kanji signage legible without hallucinating characters"]
        },
        klingAI: {
          targetModel: "Kling 1.5",
          masterPrompt: "Masterpiece video, 8k resolution, cinematic lighting, movie still from a dark sci-fi action film. A sleek carbon-fiber vehicle drifts around an urban corner in torrential rain, tires spinning up dramatic water vapor. Cyan and red neon streetlights reflect perfectly on wet black road. High-speed camera tracking, realistic cinematic motion blur, deep shadows, cinematic depth of field, photorealistic textures.",
          negativePrompt: "blur, distort, deform, low quality, static, cartoon, oversaturated, amateur footage",
          styleKeywords: ["8K Masterpiece", "Cinematic Wet Asphalt", "Motion Blur", "Deep Shadow Contrast"],
          cameraDirectives: "Fast lateral tracking with pan-follow motion.",
          lightingDirective: "Dual-tone neon side-lighting with strong specular highlights.",
          compositionDirective: "Dynamic diagonal framing.",
          motionPacing: "Fast kinetic drift.",
          aspectRatio: "16:9",
          recommendedFps: 30,
          temporalConsistencyHints: ["Vehicle body seams must remain rigid"]
        },
        universalDiffusion: {
          targetModel: "Universal Diffusion",
          masterPrompt: "Extreme cinematic action sequence, wet neon street night chase, low angle tracking shot, anamorphic lens flare, rain pouring, ultra-detailed textures, Arri Alexa 65, color graded teal and orange, photorealistic reflections, cinematic smoke.",
          negativePrompt: "blurry, video game, cgi, lowres, extra wheels, flickering, noise",
          styleKeywords: ["Teal and Orange", "Anamorphic", "Arri Alexa 65", "Realistic Smoke"],
          cameraDirectives: "Tracking shot, follow subject.",
          lightingDirective: "Rim light, wet reflections.",
          compositionDirective: "Cinematic wide angle.",
          motionPacing: "Dynamic speed.",
          aspectRatio: "2.39:1",
          recommendedFps: 24,
          temporalConsistencyHints: ["Consistent lighting direction", "Preserve camera angle coherence"]
        }
      },
      processingMetrics: {
        framesAnalyzed: 1104,
        speechSegmentsIdentified: 2,
        cutsDetected: 4,
        audioStemsSeparated: 4,
        analysisTimeSeconds: 1.84
      }
    }
  },
  {
    id: "preset-noir-dialogue",
    title: "The Midnight Informant",
    category: "Psychological Thriller / Neo-Noir",
    duration: "00:24.10",
    badge: "Subtle Motion • 24 FPS • Dialogue Heavy",
    description: "Tense two-shot dialogue scene in a smoke-filled 1950s train compartment with Venice blind light patterns.",
    previewGradient: "from-stone-950 via-neutral-900 to-amber-950",
    accentColor: "#f59e0b",
    data: {
      videoId: "preset-noir-dialogue",
      title: "The Midnight Informant",
      durationSeconds: 24.1,
      totalScenes: 3,
      resolution: "4096x2160 (4K Cinema)",
      fps: 24,
      aspectRatio: "1.85:1 Academy Flat",
      dominantColorPalette: ["#0c0d10", "#2c2a26", "#8f7c5e", "#d8c49e", "#ffffff"],
      confidenceScore: 0.98,
      modeAScript: {
        overallMood: "Smoldering suspense, suffocating intimacy, unspoken moral compromise.",
        pacing: "Deliberate, unhurried, cutting strictly on dialogue subtext and eye glances.",
        scenes: [
          {
            id: "noir-scene-1",
            sceneNumber: 1,
            timecodeStart: "00:00:00.00",
            timecodeEnd: "00:00:07.80",
            durationSeconds: 7.8,
            visualSummary: "Medium close-up of a weathered detective in a wool trenchcoat striking a vintage brass lighter. Cigarette smoke rises through hard Venetian blind shadows.",
            subjectsAndObjects: ["Detective (Male, 40s, weary face, fedora tilted)", "Zippo brass lighter", "Cigarette smoke wisps", "Glass window with rain beads"],
            environment: "Old-world passenger train private compartment, mahogany wood paneling, velvet upholstery.",
            lightingAndAtmosphere: "Classic film noir chiaroscuro. Single hard key light passing through slatted window blinds creating striped shadow patterns.",
            cameraFraming: "Medium Close-Up, 50mm vintage Cooke Speed Panchro prime lens, beautiful vintage barrel distortion.",
            cameraMovement: "Extremely subtle slow push-in (0.5mm per second) creating intimate psychological tension.",
            dialogue: [
              {
                speaker: "DETECTIVE VANCE",
                text: "You shouldn't have gotten on this train, Elena.",
                confidence: 0.99
              }
            ],
            audioNotes: {
              music: "Muted jazz trumpet with harmon mute, accompanied by a lone upright bass pizzicato line.",
              foleyAndSfx: ["Rhythmic train track chug-clack", "Crisp Zippo lighter metallic flip and strike", "Exhaled cigarette breath"],
              vocalTone: "Low baritone, gravelly, quiet and measured."
            },
            onScreenText: [],
            transitionToNext: "Slow cut on eye reaction."
          },
          {
            id: "noir-scene-2",
            sceneNumber: 2,
            timecodeStart: "00:00:07.80",
            timecodeEnd: "00:00:15.50",
            durationSeconds: 7.7,
            visualSummary: "Reverse angle on mysterious woman sitting across the table, leather gloves holding a sealed manila envelope. Raindrops streak across glass behind her.",
            subjectsAndObjects: ["Elena (Female, 30s, black veil, dark lipstick)", "Sealed wax document envelope", "Crystal water glass vibrating with train motion"],
            environment: "Opposite bench of the train compartment, reflection of passing telegraph poles in windowpane.",
            lightingAndAtmosphere: "Soft diffused Rembrandt lighting on facial plane, rim light catching black lace veil texture.",
            cameraFraming: "Close-Up, 85mm portrait telephoto lens, creamy bokeh falloff.",
            cameraMovement: "Locked tripod shot with slight organic handheld counter-balance to the carriage sway.",
            dialogue: [
              {
                speaker: "ELENA",
                text: "If I stayed in Prague until morning, they would have found the ledger before you did.",
                confidence: 0.97
              }
            ],
            audioNotes: {
              music: "Trumpet sustains a melancholic minor 9th chord, distant strings fade in quietly.",
              foleyAndSfx: ["Leather glove friction against paper", "Water vibrating against glass rim", "Distant train steam whistle"],
              vocalTone: "Steady, poised European accent with underlying tremor of genuine terror."
            },
            onScreenText: [],
            transitionToNext: "Cut on gesture as envelope slides across table."
          },
          {
            id: "noir-scene-3",
            sceneNumber: 3,
            timecodeStart: "00:00:15.50",
            timecodeEnd: "00:00:24.10",
            durationSeconds: 8.6,
            visualSummary: "Tight insert shot of the detective's scarred hand resting on the envelope, followed by a tilt-up to both characters in profile as train plunges into a mountain tunnel.",
            subjectsAndObjects: ["Envelope with broken red wax seal", "Two silhouettes facing each other", "Window glass blacking out"],
            environment: "Dim compartment plunging into total shadow as ambient exterior light drops to near-zero.",
            lightingAndAtmosphere: "Dramatic contrast shift from exterior daylight to total shadow, lit only by glowing cigarette tip.",
            cameraFraming: "Two-shot profile, wide 35mm, deep focus.",
            cameraMovement: "Slow tilt-up from tabletop to eye line.",
            dialogue: [
              {
                speaker: "DETECTIVE VANCE",
                text: "Then pray this train doesn't stop at the border.",
                confidence: 0.98
              }
            ],
            audioNotes: {
              music: "Ominous low cello crescendo holding sustained dissonance.",
              foleyAndSfx: ["Train engine roar echoes heavily inside tunnel walls", "Paper envelope sliding on polished wood"],
              vocalTone: "Hushed whisper close to microphone."
            },
            onScreenText: [],
            transitionToNext: "Fade into absolute black."
          }
        ]
      },
      modeBPrompt: {
        runwayGen3: {
          targetModel: "Runway Gen-3",
          masterPrompt: "1950s cinematic neo-noir film scene shot on 35mm Eastman Kodak black and white film stock. A weary detective in a fedora and heavy trenchcoat strikes a vintage brass lighter inside a dimly lit European passenger train car. Slatted Venetian blinds cast sharp linear geometric shadows across his face. Fine cigarette smoke billows through the hard shaft of light. Film grain, authentic optical bokeh, Cooke vintage lens characteristics, intense psychological mood, slow cinematic push-in.",
          negativePrompt: "color, modern digital camera, HDR, clean digital noise-free look, anime, 3d render, oversaturated, fast cuts",
          styleKeywords: ["Film Noir", "Black & White 35mm", "Chiaroscuro Shadows", "Vintage Cooke Lenses", "Psychological Suspense", "Subtle Push-In"],
          cameraDirectives: "Slow deliberate creeping push-in at eye level, capturing micro-expressions without abrupt movement.",
          lightingDirective: "Extreme hard key lighting from exterior side window with slatted blind shadow masks.",
          compositionDirective: "Tight asymmetrical framing with negative space swallowed in deep black shadows.",
          motionPacing: "Slow burn, hypnotic cinematic rhythm.",
          aspectRatio: "1.85:1",
          recommendedFps: 24,
          temporalConsistencyHints: ["Maintain smoke curl physics without flickering", "Preserve consistent shadow stripe angles on character face"]
        },
        openaiSora: {
          targetModel: "OpenAI Sora",
          masterPrompt: "An atmospheric 1950s drama shot on period-accurate celluloid film: Inside a luxury vintage sleeper train rattling along rain-swept tracks at night, a man and woman speak in low voices across a mahogany table. Cigarette smoke curls languidly in the air, catching the amber light of passing train signals through the raindrop-covered window. The lighting shifts dynamically as the train passes outside lights. True optical depth of field, naturalistic human skin texture, authentic period costume drapery.",
          styleKeywords: ["Celluloid Film Texture", "Naturalistic Human Acting", "Dynamic Train Lighting", "Period Drama"],
          cameraDirectives: "Stable locked camera with natural harmonic chassis vibration.",
          lightingDirective: "Passing exterior streetlights and signal lanterns creating rhythmic shadow movement.",
          compositionDirective: "Intimate two-shot over-the-shoulder framing.",
          motionPacing: "Measured and theatrical.",
          aspectRatio: "16:9",
          recommendedFps: 24,
          temporalConsistencyHints: ["Accurate finger and hand movements while handling paper", "Maintain realistic smoke dispersion"]
        },
        klingAI: {
          targetModel: "Kling 1.5",
          masterPrompt: "Masterpiece film scene, cinematic noir lighting, moody detective sitting in vintage train compartment, smoke floating in beam of light, rain outside window, high fidelity, 35mm film grain, masterpiece cinema still.",
          negativePrompt: "lowres, plastic skin, distorted fingers, bright colors, bad lighting",
          styleKeywords: ["Noir Lighting", "Smoke Shaft", "35mm Grain", "Moody Vintage"],
          cameraDirectives: "Static slow zoom.",
          lightingDirective: "Hard key beam of light.",
          compositionDirective: "Golden ratio portrait.",
          motionPacing: "Slow subtle motion.",
          aspectRatio: "16:9",
          recommendedFps: 24,
          temporalConsistencyHints: ["Face symmetry stability"]
        },
        universalDiffusion: {
          targetModel: "Universal Diffusion",
          masterPrompt: "Cinematic noir scene, detective smoking in train compartment, hard chiaroscuro lighting, venetian blind shadows, 35mm film still, intense mood, panavision lens.",
          negativePrompt: "digital, flat lighting, amateur, cartoon",
          styleKeywords: ["Chiaroscuro", "Panavision", "Film Still", "Detective"],
          cameraDirectives: "Slow dolly forward.",
          lightingDirective: "Directional side light.",
          compositionDirective: "Rule of thirds.",
          motionPacing: "Calm and steady.",
          aspectRatio: "1.85:1",
          recommendedFps: 24,
          temporalConsistencyHints: ["Preserve facial features"]
        }
      },
      processingMetrics: {
        framesAnalyzed: 578,
        speechSegmentsIdentified: 3,
        cutsDetected: 3,
        audioStemsSeparated: 3,
        analysisTimeSeconds: 1.42
      }
    }
  },
  {
    id: "preset-macro-nature",
    title: "Abyssal Bioluminescence",
    category: "Macro Nature / Scientific Cinema",
    duration: "00:15.00",
    badge: "Super Macro • 120 FPS • Fluid Dynamics",
    description: "Deep sea hydrothermal vent organism with pulsating neon photophores and micro-tentacle currents.",
    previewGradient: "from-indigo-950 via-purple-950 to-neutral-950",
    accentColor: "#a855f7",
    data: {
      videoId: "preset-macro-nature",
      title: "Abyssal Bioluminescence",
      durationSeconds: 15.0,
      totalScenes: 2,
      resolution: "3840x2160 (4K UHD)",
      fps: 120,
      aspectRatio: "16:9 Widescreen",
      dominantColorPalette: ["#020307", "#0d1b3e", "#00f0ff", "#a855f7", "#ffffff"],
      confidenceScore: 0.99,
      modeAScript: {
        overallMood: "Hypnotic, otherworldly, pristine scientific wonder and cosmic serenity.",
        pacing: "Ultra slow-motion (120fps slowed to 24fps), continuous fluid organic ballet.",
        scenes: [
          {
            id: "abyss-scene-1",
            sceneNumber: 1,
            timecodeStart: "00:00:00.00",
            timecodeEnd: "00:00:08.00",
            durationSeconds: 8.0,
            visualSummary: "Extreme super-macro shot of a translucent siphonophore floating in pitch-black deep abyss. Pulsing rhythmic waves of electrical azure bioluminescence ripple down its glass-like bells.",
            subjectsAndObjects: ["Translucent bathypelagic siphonophore organism", "Suspended marine snow particles", "Microscopic iridescent ciliated tentacles"],
            environment: "Abyssal midnight zone, 3,000 meters below sea level, complete absence of ambient solar sunlight.",
            lightingAndAtmosphere: "100% self-luminous bioluminescent emission from organ photophores. Deep internal cyan and violet glow refracted through crystalline tissue.",
            cameraFraming: "Extreme Macro Probe Lens (Laowa 24mm f/14 2X Macro Probe), razor-thin 0.8mm depth of field.",
            cameraMovement: "Continuous silky linear floating glide forward between individual tentacle filaments.",
            audioNotes: {
              music: "Ethereal ambient glass harmonica harmonies and resonant sub-oceanic sine waves.",
              foleyAndSfx: ["Deep oceanic pressure rumble (sub-30Hz)", "Microscopic aqueous fluid bubbles", "Hydrophone hydro-electric clicks"],
              vocalTone: "No spoken dialogue."
            },
            onScreenText: ["DEPTH: 3,240M", "BAROMETRIC: 320 ATM"],
            transitionToNext: "Fluid dissolve into micro-cellular detail."
          },
          {
            id: "abyss-scene-2",
            sceneNumber: 2,
            timecodeStart: "00:00:08.00",
            timecodeEnd: "00:00:15.00",
            durationSeconds: 7.0,
            visualSummary: "Sub-cellular probe view showing chemical luciferin reaction sparking like a miniature galaxy of neon violet stars within the organism's membrane.",
            subjectsAndObjects: ["Luciferase enzyme reaction nodes", "Fluorescent protein membranes", "Vibrating water molecules in fluid suspension"],
            environment: "Deep oceanic fluid medium with drifting gold-flecked suspended particulate.",
            lightingAndAtmosphere: "Pulsating ultraviolet and electric magenta waves radiating outward through dark water.",
            cameraFraming: "Microscopic magnification (5x optical), orbiting focal plane.",
            cameraMovement: "Slow orbital helical track around the central bioluminescent nucleus.",
            audioNotes: {
              music: "Ascending ambient crystalline shimmer tones echoing into infinite stereo field.",
              foleyAndSfx: ["Sub-bass swell", "Fluid harmonic resonance", "Water cavern acoustic echo"],
              vocalTone: "No spoken dialogue."
            },
            onScreenText: ["PHOTOPHORE FREQ: 1.2 HZ"],
            transitionToNext: "Fade out into eternal abyssal dark."
          }
        ]
      },
      modeBPrompt: {
        runwayGen3: {
          targetModel: "Runway Gen-3",
          masterPrompt: "Super macro scientific documentary footage shot on RED V-Raptor 8K at 120fps. A crystalline translucent siphonophore creature floating in the pitch-black midnight ocean at 3,000m depth. Rhythmic glowing waves of neon cyan and violet bioluminescence pulse along its glass-like organ bells and microscopic ciliated tentacles. Drifting marine snow particulates, extreme shallow depth of field, Laowa 24mm macro probe lens, fluid hydrodynamics, BBC Blue Planet II quality, sublime photorealism.",
          negativePrompt: "bright daylight, surface water, cartoon, 3d CGI artifact, plastic, grainy low light noise, flat lighting",
          styleKeywords: ["Super Macro Probe", "Bioluminescence", "Deep Sea 3000m", "120fps Slow Motion", "BBC Nature Documentary", "Refractive Transparency"],
          cameraDirectives: "Smooth probe lens glide moving directly through floating organic tentacles with zero collision.",
          lightingDirective: "Completely self-illuminated subject, pitch-black backdrop with specular refractions inside translucent body.",
          compositionDirective: "Centered organic fractal symmetry.",
          motionPacing: "Hypnotic, ultra-slow fluid pulsation.",
          aspectRatio: "16:9",
          recommendedFps: 120,
          temporalConsistencyHints: ["Preserve gelatinous fluid elasticity", "Maintain organic wave propagation of light pulses"]
        },
        openaiSora: {
          targetModel: "OpenAI Sora",
          masterPrompt: "High-definition underwater macro cinema: An alien-like deep sea jellyfish suspended in absolute darkness, illuminating itself with vibrant electric blue and violet bioluminescent pulses that travel down delicate transparent filaments. Tiny flecks of organic particulate drift past in the slow ocean current. The camera executes an impossible micro-tracking pass, curving around the glowing pulsating organs with pristine clarity and realistic fluid mechanics.",
          styleKeywords: ["Fluid Mechanics", "Extreme Macro", "Electroluminescent Pulse", "Sublime Nature"],
          cameraDirectives: "Micro orbital probe shot.",
          lightingDirective: "Internal bioluminescent emission reflecting on marine particulates.",
          compositionDirective: "Dynamic curved spiral geometry.",
          motionPacing: "Dreamlike slow-motion current drift.",
          aspectRatio: "16:9",
          recommendedFps: 60,
          temporalConsistencyHints: ["Smooth physics-based tentacle trailing", "Consistent light emission intensity"]
        },
        klingAI: {
          targetModel: "Kling 1.5",
          masterPrompt: "Masterpiece macro photo of deep ocean bioluminescent jellyfish, glowing blue tentacles, black background, 8k resolution, National Geographic photography award winner, incredible detail, micro water particles.",
          negativePrompt: "blurry, low quality, cartoon, digital art, daylight",
          styleKeywords: ["National Geographic", "Glowing Tentacles", "Deep Ocean Macro"],
          cameraDirectives: "Slow pan across tentacles.",
          lightingDirective: "Bioluminescent glow.",
          compositionDirective: "Macro close-up.",
          motionPacing: "Slow pulsation.",
          aspectRatio: "16:9",
          recommendedFps: 30,
          temporalConsistencyHints: ["Tentacle continuity"]
        },
        universalDiffusion: {
          targetModel: "Universal Diffusion",
          masterPrompt: "Extreme macro shot of translucent bioluminescent deep sea creature, glowing cyan light, pitch black ocean, 8k, photorealistic.",
          negativePrompt: "lowres, cartoon, blurry",
          styleKeywords: ["Macro", "Bioluminescent", "Photorealistic"],
          cameraDirectives: "Forward tracking.",
          lightingDirective: "Self-glow.",
          compositionDirective: "Centered.",
          motionPacing: "Slow.",
          aspectRatio: "16:9",
          recommendedFps: 60,
          temporalConsistencyHints: ["Maintain light ripple direction"]
        }
      },
      processingMetrics: {
        framesAnalyzed: 1800,
        speechSegmentsIdentified: 0,
        cutsDetected: 2,
        audioStemsSeparated: 2,
        analysisTimeSeconds: 2.15
      }
    }
  }
];
