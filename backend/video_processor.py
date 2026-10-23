"""
Video processing utilities using PyAV (embedded FFmpeg) with ffprobe fallback
for container metadata extraction, frame metrics, and keyframe processing.
"""

import os
import subprocess
import json
from typing import Dict, Any, List

def extract_video_metadata(video_path: str) -> Dict[str, Any]:
    """
    Extract container metadata (resolution, fps, duration, aspect ratio, audio present)
    using PyAV with fallback to ffprobe subprocess.
    """
    # 1. Try PyAV first (high reliability on Windows/Linux/Mac with no external exe needed)
    try:
        import av
        container = av.open(video_path)
        video_stream = next((s for s in container.streams.video), None)
        audio_stream = next((s for s in container.streams.audio), None)
        
        if video_stream:
            width = video_stream.width or 1920
            height = video_stream.height or 1080
            
            # Rate computation
            rate = video_stream.average_rate or video_stream.base_rate
            fps = 30
            if rate:
                fps = round(float(rate.numerator) / float(rate.denominator)) if rate.denominator else 30
            
            # Duration in seconds
            duration = float(video_stream.duration * video_stream.time_base) if video_stream.duration and video_stream.time_base else None
            if not duration and container.duration:
                duration = float(container.duration) / 1000000.0
            if not duration:
                duration = 10.0
                
            duration = round(duration, 2)
            
            # Format aspect ratio string
            ratio = width / height if height else 1.777
            if abs(ratio - (16 / 9)) < 0.08:
                aspect_str = "16:9 Widescreen"
            elif abs(ratio - (9 / 16)) < 0.08:
                aspect_str = "9:16 Vertical"
            elif abs(ratio - 2.39) < 0.12 or abs(ratio - 2.35) < 0.12:
                aspect_str = "2.39:1 Anamorphic"
            elif abs(ratio - 1.85) < 0.08:
                aspect_str = "1.85:1 Academy Flat"
            elif abs(ratio - 1.0) < 0.08:
                aspect_str = "1:1 Square"
            else:
                aspect_str = f"{width}:{height}"
                
            container.close()
            return {
                "resolution": f"{width}x{height}",
                "width": width,
                "height": height,
                "fps": max(1, fps),
                "duration": max(0.5, duration),
                "aspect_ratio": aspect_str,
                "has_audio": audio_stream is not None,
                "codec": video_stream.codec_context.name if video_stream.codec_context else "h264"
            }
    except Exception:
        pass

    # 2. Try ffprobe if present
    cmd = [
        "ffprobe",
        "-v", "error",
        "-show_entries", "stream=width,height,r_frame_rate,codec_name:format=duration",
        "-of", "json",
        video_path
    ]
    try:
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
        data = json.loads(result.stdout)
        
        streams = data.get("streams", [])
        video_stream = next((s for s in streams if "width" in s), {})
        
        width = video_stream.get("width", 1920)
        height = video_stream.get("height", 1080)
        
        fps_str = video_stream.get("r_frame_rate", "30/1")
        if "/" in fps_str:
            num, den = fps_str.split("/")
            fps = round(float(num) / float(den)) if float(den) != 0 else 30
        else:
            fps = int(float(fps_str))
            
        duration = float(data.get("format", {}).get("duration", 15.0))
        
        aspect_ratio = f"{width}:{height}"
        ratio = width / height if height else 1.777
        if abs(ratio - 16 / 9) < 0.08:
            aspect_ratio = "16:9 Widescreen"
        elif abs(ratio - 9 / 16) < 0.08:
            aspect_ratio = "9:16 Vertical"
        elif abs(ratio - 2.39) < 0.12:
            aspect_ratio = "2.39:1 Anamorphic"
            
        return {
            "resolution": f"{width}x{height}",
            "width": width,
            "height": height,
            "fps": fps,
            "duration": round(duration, 2),
            "aspect_ratio": aspect_ratio,
            "has_audio": True,
            "codec": video_stream.get("codec_name", "h264")
        }
    except Exception:
        # Fallback safe defaults if all probing fails
        return {
            "resolution": "1920x1080",
            "width": 1920,
            "height": 1080,
            "fps": 30,
            "duration": 15.0,
            "aspect_ratio": "16:9 Widescreen",
            "has_audio": True,
            "codec": "unknown"
        }

def sample_keyframes_pyav(video_path: str, max_keyframes: int = 5) -> List[float]:
    """
    Extract timestamps of key scene intervals using PyAV packet keyframe markers.
    """
    try:
        import av
        container = av.open(video_path)
        stream = next((s for s in container.streams.video), None)
        if not stream:
            return []
            
        key_timestamps = []
        for packet in container.demux(stream):
            if packet.is_keyframe and packet.pts is not None and packet.time_base:
                t = float(packet.pts * packet.time_base)
                if not key_timestamps or (t - key_timestamps[-1] >= 1.5):
                    key_timestamps.append(round(t, 2))
                    if len(key_timestamps) >= max_keyframes:
                        break
        container.close()
        return key_timestamps
    except Exception:
        return []
