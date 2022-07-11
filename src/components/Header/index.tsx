import { NavLink } from 'react-router-dom'
import { Scroll, Timer } from 'phosphor-react'
import Tippy from '@tippyjs/react'
import logoIgnite from '../../assets/logo-ignite.svg'
import { HeaderContainer } from './styles'
import 'tippy.js/dist/tippy.css'

export function Header() {
  return (
    <HeaderContainer>
      <img
        src={logoIgnite}
        alt="Logo do ignite, com o formato de dois triângulos
          de tamanhos diferentes e cor verde"
      />
      <nav>
        <Tippy content="Timer" theme="tomato">
          <NavLink to="/">
            <Timer />
          </NavLink>
        </Tippy>
        <Tippy content="Histórico">
          <NavLink to="/history">
            <Scroll />
          </NavLink>
        </Tippy>
      </nav>
    </HeaderContainer>
  )
}
