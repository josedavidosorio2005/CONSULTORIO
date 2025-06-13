import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

// Mock framer-motion to avoid issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: React.ComponentProps<'h1'>) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: React.ComponentProps<'p'>) => <p {...props}>{children}</p>,
    button: ({ children, ...props }: React.ComponentProps<'button'>) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}))

// Mock react-intersection-observer
jest.mock('react-intersection-observer', () => ({
  useInView: () => [jest.fn(), true],
}))

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />)
    
    const heading = screen.getByRole('heading', {
      name: /bienvenido a fisiosalut/i,
    })
    
    expect(heading).toBeInTheDocument()
  })

  it('renders the call-to-action button', () => {
    render(<Home />)
    
    const ctaButton = screen.getByRole('button', {
      name: /reserva tu cita ahora/i,
    })
    
    expect(ctaButton).toBeInTheDocument()
  })

  it('displays service cards', () => {
    render(<Home />)
    
    expect(screen.getByText(/experiencia/i)).toBeInTheDocument()
    expect(screen.getByText(/profesionalidad/i)).toBeInTheDocument()
    expect(screen.getByText(/atención personalizada/i)).toBeInTheDocument()
  })
})
