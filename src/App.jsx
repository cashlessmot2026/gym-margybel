import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastProvider, Loading } from './components/ui'

const ClientApp = lazy(() => import('./pages/client/ClientApp'))
const AdminApp = lazy(() => import('./pages/admin/AdminApp'))
const CheckApp = lazy(() => import('./pages/check/CheckApp'))

// 2 interfaces: cliente (/) y administración (/admin, incluye las funciones del coach); /check es el control de acceso
export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || undefined}>
        <Suspense fallback={<div className="main"><Loading /></div>}>
          <Routes>
            <Route path="/" element={<ClientApp />} />
            <Route path="/admin/*" element={<AdminApp />} />
            <Route path="/check/*" element={<CheckApp />} />
            <Route path="/coach/*" element={<Navigate to="/admin" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ToastProvider>
  )
}
