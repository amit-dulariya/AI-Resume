/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { ResumeBuilderPage } from './pages/ResumeBuilderPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { ResumeAnalyzerPage } from './pages/ResumeAnalyzerPage';
import { JobMatcherPage } from './pages/JobMatcherPage';
import { ResumeHistoryPage } from './pages/ResumeHistoryPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Pages */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        {/* Dashboard & Workspace App Pages */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/builder" element={<ResumeBuilderPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/analyzer" element={<ResumeAnalyzerPage />} />
          <Route path="/matcher" element={<JobMatcherPage />} />
          <Route path="/history" element={<ResumeHistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

