"use client";

import React, { useState } from "react";
import Navigation from "@/components/fragments/navigation";
import PageHeader from "@/components/fragments/page-header";
import HypothesisInput from "@/components/fragments/hypothesis-input";
import ChiSquareTable from "@/components/fragments/chi-square-table";
import ChiSquareStats from "@/components/fragments/chi-square-stats";
import ChiSquareChart from "@/components/fragments/chi-square-chart";
import HypothesisResult from "@/components/fragments/hypothesis-result";
import ChiSquareDocumentation from "@/components/fragments/chi-square-documentation";
import DesktopResultsPanel from "@/components/fragments/desktop-results-panel";
import DesktopChiSquareForm from "@/components/fragments/desktop-chi-square-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Send, Trash2, AlertCircle } from "lucide-react";
import { useChiSquareTable } from "@/hooks/use-chi-square-table";
import { useChiSquare } from "@/hooks/use-chi-square";

export default function ChiSquare() {
    const { rows, UpdateRow, AddRow, RemoveRow, Clear } = useChiSquareTable(2);
    const [nullHypothesis, setNullHypothesis] = useState("");
    const [altHypothesis, setAltHypothesis] = useState("");
    const [activeTab, setActiveTab] = useState("calculator");

    const stats = useChiSquare(rows);
    const criticalValue = stats.criticalValue;

    const HandleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!nullHypothesis.trim() || !altHypothesis.trim()) {
            return;
        }
        
        console.log("Chi-square data:", rows);
    };

    const showHypothesisWarning = stats.chartData.length > 0 && 
        stats.chartData.some(d => d.observed > 0) && 
        (!nullHypothesis.trim() || !altHypothesis.trim());

    return (
        <>
            <Navigation />
            <section className="min-h-screen py-12 px-6">
                <div className="mx-auto">
                    <PageHeader title="Chi-Square Goodness of Fit Test" subtitle="Enter your observed frequencies in the table below" />

                    {/* Mobile/Tablet: Tabs */}
                    <div className="2xl:hidden">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                            <TabsList>
                                <TabsTrigger value="calculator">Calculator</TabsTrigger>
                                <TabsTrigger value="documentation">How It Works</TabsTrigger>
                            </TabsList>

                            <TabsContent value="calculator">

                                <form onSubmit={HandleSubmit} className="space-y-8">
                                    <Card className="shadow-xl">
                                        <CardContent className="space-y-8">
                                        <HypothesisInput
                                            nullHypothesis={nullHypothesis}
                                            altHypothesis={altHypothesis}
                                            onNullChange={setNullHypothesis}
                                            onAltChange={setAltHypothesis}
                                        />

                                        <ChiSquareTable
                                            rows={rows}
                                            expected={stats.expected}
                                            onUpdateRow={UpdateRow}
                                            onAddRow={AddRow}
                                            onRemoveRow={RemoveRow}
                                        />

                                            <div className="flex items-center gap-4">
                                                <Button
                                                    type="submit"
                                                    variant="default"
                                                    className="rounded-lg shadow-lg hover:shadow-xl transition-all text-sm font-semibold"
                                                >
                                                    <Send size={16} />
                                                    Calculate
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={Clear}
                                                    className="rounded-lg border-2 hover:bg-red-50 hover:border-red-300 transition-all text-sm font-medium"
                                                >
                                                    <Trash2 size={16} className="text-red-600" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {showHypothesisWarning && (
                                        <Alert variant="destructive" className="shadow-lg">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertDescription>
                                                Please enter both null and alternative hypotheses before viewing the results.
                                            </AlertDescription>
                                        </Alert>
                                    )}

                                    {stats.chartData.length > 0 && stats.chartData.some(d => d.observed > 0) && nullHypothesis.trim() && altHypothesis.trim() && (
                                        <Card className="shadow-xl">
                                            <CardContent>
                                                <div className="mb-6">
                                                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">Chi-Square Analysis</h2>
                                                <ChiSquareStats
                                                    chiSquare={stats.chiSquare}
                                                    df={stats.df}
                                                    criticalValue={criticalValue}
                                                />
                                            </div>

                                            <div className="mb-6">
                                                <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-3">Chi-Square Distribution Curve</h3>
                                                <ChiSquareChart
                                                    curveData={stats.curveData}
                                                    chiSquare={stats.chiSquare}
                                                    criticalValue={criticalValue}
                                                />
                                            </div>

                                                <HypothesisResult
                                                    chiSquare={stats.chiSquare}
                                                    criticalValue={criticalValue}
                                                    df={stats.df}
                                                    nullHypothesis={nullHypothesis}
                                                    altHypothesis={altHypothesis}
                                                />
                                            </CardContent>
                                        </Card>
                                    )}
                                </form>
                            </TabsContent>

                            <TabsContent value="documentation">
                                <ChiSquareDocumentation />
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Desktop 2XL+: Two Columns */}
                    <div className="hidden 2xl:block space-y-8">
                        {/* First Row: Inputs (Left) and Results (Right) */}
                        <div className="grid grid-cols-2 gap-8">
                            <form onSubmit={HandleSubmit}>
                                <DesktopChiSquareForm
                                    rows={rows}
                                    expected={stats.expected}
                                    nullHypothesis={nullHypothesis}
                                    altHypothesis={altHypothesis}
                                    onNullChange={setNullHypothesis}
                                    onAltChange={setAltHypothesis}
                                    onUpdateRow={UpdateRow}
                                    onAddRow={AddRow}
                                    onRemoveRow={RemoveRow}
                                    onClear={Clear}
                                />
                            </form>

                            <div>
                                {showHypothesisWarning && (
                                    <Alert variant="destructive" className="shadow-lg mb-6">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>
                                            Please enter both null and alternative hypotheses before viewing the results.
                                        </AlertDescription>
                                    </Alert>
                                )}
                                {nullHypothesis.trim() && altHypothesis.trim() && (
                                    <DesktopResultsPanel
                                        chiSquare={stats.chiSquare}
                                        df={stats.df}
                                        criticalValue={criticalValue}
                                        chartData={stats.chartData}
                                        curveData={stats.curveData}
                                        nullHypothesis={nullHypothesis}
                                        altHypothesis={altHypothesis}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Second Row: Documentation */}
                        <div>
                            <ChiSquareDocumentation />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
