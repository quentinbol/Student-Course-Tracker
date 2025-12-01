import React from 'react';
import { Card, CardHeader, CardContent, CardDescription } from '../ui/card';
import { ArrowUpRight } from 'lucide-react';

export const StatCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  gradient,
  textColor
}: { 
  title: string; 
  value: string | number; 
  change?: string; 
  icon: React.ElementType; 
  gradient: string;
  textColor?: string;
}) => (
  <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
    <div className={`absolute inset-0 z-0 ${gradient}`} />
    <CardHeader className="relative z-10 pb-2">
      <div className="flex items-center justify-between">
        <CardDescription className={`text-sm font-medium ${textColor || 'text-gray-600'}`}>{title}</CardDescription>
        <div className={`p-2 rounded-full border-2 border-green-800 bg-white bg-opacity-100`}>
          <Icon className={'h-5 w-5 text-gray-700'} />
        </div>
      </div>
    </CardHeader>
    <CardContent className="relative z-10">
      <div className="space-y-1 z-10">
        <div className={`text-3xl font-bold ${textColor || 'text-gray-900'}`}>{value}</div>
        {change && (
          <div className="flex items-center text-sm">
            <ArrowUpRight className="h-4 w-4 text-green-300 mr-1" />
            <span className="text-green-300 font-medium">{change}</span>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);