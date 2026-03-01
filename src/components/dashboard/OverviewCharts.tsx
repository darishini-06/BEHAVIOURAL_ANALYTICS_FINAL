
"use client";

import { Bar, BarChart, CartesianGrid, LabelList, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, ScatterChart, Scatter, ZAxis, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const spendingData = [
  { category: "Dining Out", amount: 450, impulses: 12 },
  { category: "Fashion", amount: 320, impulses: 8 },
  { category: "Electronics", amount: 600, impulses: 4 },
  { category: "Entertainment", amount: 280, impulses: 15 },
  { category: "Subscriptions", amount: 150, impulses: 2 },
];

const trendData = [
  { month: "Jan", score: 45 },
  { month: "Feb", score: 52 },
  { month: "Mar", score: 48 },
  { month: "Apr", score: 65 },
  { month: "May", score: 58 },
  { month: "Jun", score: 72 },
];

const radarData = [
  { subject: 'Impulsivity', A: 120, B: 110, fullMark: 150 },
  { subject: 'Savings', A: 98, B: 130, fullMark: 150 },
  { subject: 'Budgeting', A: 86, B: 130, fullMark: 150 },
  { subject: 'Social Spend', A: 99, B: 100, fullMark: 150 },
  { subject: 'Self Control', A: 85, B: 90, fullMark: 150 },
  { subject: 'Peer Impact', A: 65, B: 85, fullMark: 150 },
];

const riskDistributionData = [
  { score: '0-20', count: 12 },
  { score: '21-40', count: 25 },
  { score: '41-60', count: 45 },
  { score: '61-80', count: 30 },
  { score: '81-100', count: 18 },
];

const scatterData = [
  { x: 2000, y: 400, z: 200 },
  { x: 2500, y: 600, z: 260 },
  { x: 3000, y: 300, z: 400 },
  { x: 3500, y: 800, z: 280 },
  { x: 4000, y: 500, z: 500 },
];

const pieData = [
  { name: 'Spontaneous', value: 400 },
  { name: 'Emotional', value: 300 },
  { name: 'Planned', value: 300 },
];

const chartConfig = {
  amount: { label: "Amount", color: "hsl(var(--chart-1))" },
  impulses: { label: "Impulses", color: "hsl(var(--chart-2))" },
  score: { label: "Risk Score", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

export function OverviewCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1">
      {/* Chart 1: Spending Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Spending by Category</CardTitle>
          <CardDescription>Monthly average spend vs detected impulse actions</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={spendingData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="category" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="amount" fill="var(--color-amount)" radius={4} />
              <Bar dataKey="impulses" fill="var(--color-impulses)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Chart 2: Impulse Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Financial Risk Score Trend</CardTitle>
          <CardDescription>Aggregate trend over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <LineChart data={trendData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="score" stroke="var(--color-score)" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Chart 3: Risk Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Impulse Risk Distribution</CardTitle>
          <CardDescription>Population density by risk score range</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <AreaChart data={riskDistributionData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="score" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="step" dataKey="count" fill="hsl(var(--chart-2))" fillOpacity={0.3} stroke="hsl(var(--chart-2))" />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Chart 4: Income vs Impulse Strength */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Income vs. Impulse Frequency</CardTitle>
          <CardDescription>Correlation analysis of disposable income levels</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ScatterChart>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="Income" unit="$" />
              <YAxis type="number" dataKey="y" name="Frequency" />
              <ZAxis type="number" dataKey="z" range={[50, 400]} name="Impact" />
              <ChartTooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Users" data={scatterData} fill="hsl(var(--chart-1))" />
            </ScatterChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Chart 5: Behavior Characteristics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Behavioral Profile Radar</CardTitle>
          <CardDescription>Comparing average profiles against targets</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <RadarChart outerRadius={90} data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 150]} />
              <Radar name="Target Profile" dataKey="A" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.6} />
              <Radar name="Your Profile" dataKey="B" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Chart 6: Impulse Drivers */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Impulse Trigger Distribution</CardTitle>
          <CardDescription>Primary drivers identified in survey data</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? 'hsl(var(--chart-1))' : index === 1 ? 'hsl(var(--chart-2))' : 'hsl(var(--chart-3))'} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      {/* Chart 7: Cumulative Savings Impact */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Projected Savings Impact</CardTitle>
          <CardDescription>Potential savings if impulse behavior is mitigated by 50%</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="score" stroke="hsl(var(--chart-2))" fillOpacity={1} fill="url(#colorImpact)" />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
