// Importanto componentes.
import { Repositorylist } from './components/RepositoryList';

// Importando CSS
import './styles/global.scss';

// Componente é uma função que retorna um HTML.
// O nome do componente deve sempre começar com letra maiúscula.
// Sempre usar um componente por arquivo. Nunca dois no mesmo arquivo.
export function App() {
  return (
      <Repositorylist />
  )
}