import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastProvider, Loading } from './components/ui'

const ClientApp = lazy(() => import('./pages/client/ClientApp'))
const AdminApp = lazy(() => import('./pages/admin/AdminApp'))
const CheckApp = lazy(() => import('./pages/check/CheckApp'))

// Portada "Tu mejor versión": se muestra al abrir la app y se cierra sola (o al tocarla)
function Portada() {
  const [fase, setFase] = useState('on')
  useEffect(() => {
    const t1 = setTimeout(() => setFase('off'), 2600)
    const t2 = setTimeout(() => setFase('fin'), 3200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])
  if (fase === 'fin') return null
  return (
    <div className={`portada${fase === 'off' ? ' off' : ''}`} onClick={() => setFase('off')}>
      <img src={`${import.meta.env.BASE_URL}inicio.jpg`} alt="Tu mejor versión empieza aquí" />
    </div>
  )
}

// 2 interfaces: cliente (/) y administración (/admin, incluye las funciones del coach); /check es el control de acceso
export default function App() {
  return (
    <ToastProvider>
      <Portada />
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
