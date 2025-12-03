'use client';

import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react';

interface VideoPlayerProps {
  src?: string;
  poster?: string;
  showControls?: boolean;
}

export default function VideoPlayer({
  src,
  poster,
  showControls = true,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Placeholder video player (actual video functionality would need real implementation)
  return (
    <div className="relative w-full aspect-video bg-[#1A1A1A] rounded-2xl overflow-hidden group">
      {/* Video placeholder / poster */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: poster ? `url(${poster})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 text-[#1A1A1A]" />
          ) : (
            <Play className="w-8 h-8 text-[#1A1A1A] ml-1" />
          )}
        </button>
      </div>

      {/* Controls */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Progress bar */}
          <div className="mb-3">
            <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden cursor-pointer">
              <div
                className="h-full bg-white rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Control buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:text-white/80 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </button>
              <button className="text-white hover:text-white/80 transition-colors">
                <SkipBack className="w-5 h-5" />
              </button>
              <button className="text-white hover:text-white/80 transition-colors">
                <SkipForward className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:text-white/80 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <span className="text-white text-sm">0:00 / 5:32</span>
            </div>
            <button className="text-white hover:text-white/80 transition-colors">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Speed/captions buttons */}
      <div className="absolute bottom-4 right-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-xs hover:bg-white/30 transition-colors">
          CC
        </button>
        <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-xs hover:bg-white/30 transition-colors">
          1x
        </button>
      </div>
    </div>
  );
}
