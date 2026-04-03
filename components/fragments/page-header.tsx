import React from 'react'
import { Sparkles } from 'lucide-react'

type Prop = {
  title: string
  subtitle: string
}

export default function PageHeader(prop: Prop) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">{prop.title}</h1>
      </div>
      <p className="text-base text-slate-600 ml-14">{prop.subtitle}</p>
    </div>
  )
}
