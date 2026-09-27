import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { RecipeDetail } from './pages/RecipeDetail'

export default function App() {
  return (
    <BrowserRouter>
      <div className="kitchen-glow flex min-h-dvh flex-col">
        <Header />
        <main className="flex flex-1 flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tarif/:id" element={<RecipeDetail />} />
          </Routes>
        </main>
        <footer className="border-t border-border py-6 text-center text-xs text-cream-muted">
          Mihriban&apos;ın Mutfağı · {new Date().getFullYear()}
        </footer>
      </div>
    </BrowserRouter>
  )
}
