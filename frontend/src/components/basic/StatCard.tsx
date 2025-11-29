import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, gradient }) => (
  <Card className={`${gradient} text-white border-0`}>
    <CardHeader className="pb-2">
      <CardDescription className="text-white opacity-90">{title}</CardDescription>
      <CardTitle className="text-3xl font-bold">{value}</CardTitle>
    </CardHeader>
    <CardContent>
      <Icon className="h-8 w-8 opacity-80" />
    </CardContent>
  </Card>
);
