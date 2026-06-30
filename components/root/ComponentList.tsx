import { Components } from "@/types"
import ComponentCard from "./ComponentCard"

interface ComponentListProps {
  title: string
  components: Components[]
  containerClassName?: string
}

export default function ComponentList({title, components,containerClassName}:ComponentListProps) {
  return (
    <section className={containerClassName} >
      <h2 className='font-degular-display text-4xl' >{title}</h2>
      <ul className="book-list">
        {components.map((component) => (
          <ComponentCard key={component.id} {...component} />
        ))}
      </ul>
    </section>
  )
}