import { Construction } from 'lucide-react'

export default function ComingSoon({ page }: { page: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
        <Construction size={22} className="text-orange-600" />
      </div>
      <h2 className="text-base font-medium text-stone-900 mb-1">{page}</h2>
      <p className="text-sm text-stone-400">This section is under construction</p>
    </div>
  )
}
