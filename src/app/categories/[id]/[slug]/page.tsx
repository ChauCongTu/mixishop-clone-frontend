import React from 'react'

const CategoriesPage = ({ params }: { params: { id:number, slug: string } }) => {
  return (
    <div>
        <p>Slug: {params.slug}</p>
    </div>
  )
}

export default CategoriesPage