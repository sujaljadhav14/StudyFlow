'use client';

import { RoadmapForm } from "@/components/dashboard/RoadmapForm";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const userData = localStorage.getItem('studyflow_user');
        if (userData) {
            const user = JSON.parse(userData);
            setUserName(user.name || 'learner');
        }
    }, []);

    return (
        <div className="container mx-auto max-w-4xl py-12 px-4">
            <div className="space-y-4 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-primary">Welcome, {userName}!</h1>
                <p className="text-xl text-muted-foreground">What new heights will you reach today?</p>
            </div>
            
            <div className="mt-12">
                <RoadmapForm />
            </div>
        </div>
    );
}
