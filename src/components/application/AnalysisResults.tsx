'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ApplicationAnalysis } from '@/types';

interface AnalysisResultsProps {
  analysis: ApplicationAnalysis;
}

export default function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-[#2E7D32]';
    if (score >= 6) return 'text-[#F57C00]';
    return 'text-[#C62828]';
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 8) return 'bg-[#2E7D32]';
    if (score >= 6) return 'bg-[#F57C00]';
    return 'bg-[#C62828]';
  };

  const getOverallScoreColor = (score: number) => {
    if (score >= 80) return 'from-[#2E7D32] to-[#4CAF50]';
    if (score >= 60) return 'from-[#F57C00] to-[#FFB74D]';
    return 'from-[#C62828] to-[#EF5350]';
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1A1A1A] mb-6">AI Analysis Results</h2>

      {/* Overall Score */}
      <div className="mb-8 p-6 bg-gradient-to-br from-[#F6F6F6] to-white rounded-xl border border-[#EDEDED]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#1A1A1A]">Overall Score</h3>
          <div
            className={`text-4xl font-bold bg-gradient-to-r ${getOverallScoreColor(
              analysis.overallScore
            )} bg-clip-text text-transparent`}
          >
            {analysis.overallScore}/100
          </div>
        </div>
        <div className="w-full h-3 bg-[#EDEDED] rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getOverallScoreColor(analysis.overallScore)} transition-all duration-500`}
            style={{ width: `${analysis.overallScore}%` }}
          />
        </div>
      </div>

      {/* AI Summary */}
      <div className="mb-8 p-6 bg-[#EFF5FF] rounded-xl">
        <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">AI Summary</h3>
        <p className="text-[#676767] leading-relaxed">{analysis.aiSummary}</p>
      </div>

      {/* Score Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Video Scores */}
        {analysis.videoOverallScore && (
          <ScoreCard
            title="Video Interview"
            overallScore={analysis.videoOverallScore}
            scores={[
              { label: 'Communication', score: analysis.videoCommunicationScore || 0 },
              { label: 'Clarity', score: analysis.videoClarityScore || 0 },
              { label: 'Confidence', score: analysis.videoConfidenceScore || 0 },
            ]}
          />
        )}

        {/* CV Scores */}
        {analysis.cvOverallScore && (
          <ScoreCard
            title="Resume / CV"
            overallScore={analysis.cvOverallScore}
            scores={[
              { label: 'Relevance', score: analysis.cvRelevanceScore || 0 },
              { label: 'Experience Match', score: analysis.cvExperienceMatchScore || 0 },
              { label: 'Skills Match', score: analysis.cvSkillsMatchScore || 0 },
            ]}
          />
        )}

        {/* Case Study Scores */}
        {analysis.caseStudyOverallScore && (
          <ScoreCard
            title="Case Study"
            overallScore={analysis.caseStudyOverallScore}
            scores={[
              { label: 'Problem Solving', score: analysis.caseStudyProblemSolvingScore || 0 },
              { label: 'Analytical Depth', score: analysis.caseStudyAnalyticalDepthScore || 0 },
              { label: 'Presentation', score: analysis.caseStudyPresentationScore || 0 },
            ]}
          />
        )}
      </div>

      {/* Strengths & Concerns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Key Strengths */}
        {analysis.keyStrengths && analysis.keyStrengths.length > 0 && (
          <div className="p-6 bg-[#E8F5E9] rounded-xl">
            <h3 className="text-lg font-bold text-[#2E7D32] mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Key Strengths
            </h3>
            <ul className="space-y-2">
              {analysis.keyStrengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2 text-[#1A1A1A]">
                  <span className="text-[#2E7D32] mt-1">•</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Areas of Concern */}
        {analysis.areasOfConcern && analysis.areasOfConcern.length > 0 && (
          <div className="p-6 bg-[#FFF3E0] rounded-xl">
            <h3 className="text-lg font-bold text-[#E65100] mb-4 flex items-center gap-2">
              <TrendingDown className="w-5 h-5" />
              Areas of Concern
            </h3>
            <ul className="space-y-2">
              {analysis.areasOfConcern.map((concern, index) => (
                <li key={index} className="flex items-start gap-2 text-[#1A1A1A]">
                  <span className="text-[#E65100] mt-1">•</span>
                  {concern}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// Score Card Component
interface ScoreCardProps {
  title: string;
  overallScore: number;
  scores: { label: string; score: number }[];
}

function ScoreCard({ title, overallScore, scores }: ScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-[#2E7D32]';
    if (score >= 6) return 'text-[#F57C00]';
    return 'text-[#C62828]';
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 8) return 'bg-[#2E7D32]';
    if (score >= 6) return 'bg-[#F57C00]';
    return 'bg-[#C62828]';
  };

  return (
    <div className="p-4 bg-white border border-[#EDEDED] rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-[#1A1A1A]">{title}</h4>
        <span className={`text-2xl font-bold ${getScoreColor(overallScore)}`}>
          {overallScore.toFixed(1)}
        </span>
      </div>
      <div className="space-y-3">
        {scores.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-[#676767]">{item.label}</span>
              <span className={`font-medium ${getScoreColor(item.score)}`}>
                {item.score.toFixed(1)}
              </span>
            </div>
            <div className="w-full h-2 bg-[#EDEDED] rounded-full overflow-hidden">
              <div
                className={`h-full ${getScoreBarColor(item.score)} transition-all duration-500`}
                style={{ width: `${item.score * 10}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
