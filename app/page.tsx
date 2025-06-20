// Comentado temporariamente para testar
// import MetaAdsDashboard from './components/MetaAdsDashboard'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎯 Meta Ads Pro Dashboard
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Dashboard inteligente para análise de anúncios Meta
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Sistema funcionando perfeitamente!
          </div>
        </div>
      </div>
    </main>
  )
}
