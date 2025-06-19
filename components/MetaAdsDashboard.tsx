import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  DollarSign, 
  Eye, 
  MousePointer, 
  BarChart3,
  Activity,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Pause,
  Play,
  ExternalLink,
  Search,
  Zap,
  Star,
  Rocket,
  Globe,
  Settings,
  Database
} from 'lucide-react';

export default function MetaAdsDashboard() {
  // Estados para pesquisa de nicho
  const [nicho, setNicho] = useState('');
  const [produto, setProduto] = useState('');
  const [paisAlvo, setPaisAlvo] = useState('BR');
  const [orcamento, setOrcamento] = useState('100');
  const [dadosNicho, setDadosNicho] = useState(null);
  const [loadingNicho, setLoadingNicho] = useState(false);

  // Estados para dashboard
  const [dadosDashboard, setDadosDashboard] = useState(null);
  const [loadingDashboard, setLoadingDashboard] = useState(false);

  // Estados para configurações
  const [apiKeys, setApiKeys] = useState({
    hotmart: '',
    eduzz: '',
    monetizze: '',
    kiwify: '',
    braip: '',
    cartx: '',
    yampi: ''
  });

  // URL base do webhook (substitua pela sua URL do n8n)
  const WEBHOOK_BASE_URL = 'https://seu-n8n-instance.com/webhook';

  // Função para abrir BigSpy em nova aba
  const abrirBigSpy = () => {
    window.open('https://bigspy.com/en', '_blank', 'noopener,noreferrer');
  };

  // Função para buscar campanhas por nicho
  const buscarCampanhas = async () => {
    if (!nicho.trim()) {
      alert('Por favor, informe o nicho para pesquisa');
      return;
    }

    setLoadingNicho(true);
    try {
      const res = await fetch(`${WEBHOOK_BASE_URL}/research-niche`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nicho, 
          produto, 
          pais_alvo: paisAlvo, 
          orcamento_max: parseFloat(orcamento) 
        })
      });
      const json = await res.json();
      setDadosNicho(json);
    } catch (error) {
      console.error('Erro ao buscar campanhas:', error);
      alert('Erro ao conectar com o webhook. Verifique a URL.');
    }
    setLoadingNicho(false);
  };

  // Função para carregar dados do dashboard
  const carregarDashboard = async () => {
    setLoadingDashboard(true);
    try {
      const res = await fetch(`${WEBHOOK_BASE_URL}/dashboard`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const json = await res.json();
      setDadosDashboard(json);
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
    }
    setLoadingDashboard(false);
  };

  // Carregar dashboard ao montar componente
  useEffect(() => {
    carregarDashboard();
    // Atualizar dashboard a cada 5 minutos
    const interval = setInterval(carregarDashboard, 300000);
    return () => clearInterval(interval);
  }, []);

  // Função para formatar valores monetários
  const formatMoney = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value || 0);
  };

  // Função para determinar cor do badge baseado na performance
  const getPerformanceBadge = (roas, ctr) => {
    if (roas >= 4.0 && ctr >= 2.5) {
      return <Badge className="bg-emerald-500 text-white font-bold shadow-lg">🚀 Excepcional</Badge>;
    } else if (roas >= 2.5 && ctr >= 1.0) {
      return <Badge className="bg-amber-500 text-white font-bold shadow-lg">⭐ Boa</Badge>;
    } else {
      return <Badge className="bg-red-500 text-white font-bold shadow-lg">⚠️ Baixa</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header com animação */}
      <div className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 p-1">
        <div className="bg-slate-900 mx-1 my-1 rounded-lg">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Meta Ads Pro
                  </h1>
                  <p className="text-slate-400 text-lg">Dashboard Inteligente de Análise</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button 
                  onClick={abrirBigSpy}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-6 py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  <Search className="w-5 h-5 mr-2" />
                  BigSpy Miner
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  onClick={carregarDashboard} 
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold px-6 py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                  disabled={loadingDashboard}
                >
                  <RefreshCw className={`w-5 h-5 mr-2 ${loadingDashboard ? 'animate-spin' : ''}`} />
                  Atualizar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <Tabs defaultValue="research" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 mb-8 p-1 rounded-xl">
            <TabsTrigger 
              value="research" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500 data-[state=active]:text-white font-bold py-3 rounded-lg transition-all"
            >
              <Search className="w-4 h-4 mr-2" />
              Pesquisa
            </TabsTrigger>
            <TabsTrigger 
              value="dashboard"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white font-bold py-3 rounded-lg transition-all"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="campaigns"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white font-bold py-3 rounded-lg transition-all"
            >
              <Target className="w-4 h-4 mr-2" />
              Campanhas
            </TabsTrigger>
            <TabsTrigger 
              value="config"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white font-bold py-3 rounded-lg transition-all"
            >
              <Settings className="w-4 h-4 mr-2" />
              Config
            </TabsTrigger>
          </TabsList>

          {/* Tab de Pesquisa de Nicho */}
          <TabsContent value="research" className="space-y-8">
            {/* BigSpy Integration Card */}
            <Card className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-500/50 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold">
                  <Database className="w-6 h-6 mr-3 text-orange-400" />
                  <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    BigSpy Integration
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-6 bg-slate-800/50 rounded-xl">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">🔍 Mineração Inteligente de Anúncios</h3>
                    <p className="text-slate-300 mb-4">
                      Acesse a maior base de dados de anúncios do mundo. Encontre campanhas vencedoras, 
                      copie estratégias de sucesso e descubra novos nichos lucrativos.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="bg-cyan-500 text-white font-bold">+100M Anúncios</Badge>
                      <Badge className="bg-purple-500 text-white font-bold">9 Plataformas</Badge>
                      <Badge className="bg-emerald-500 text-white font-bold">Tempo Real</Badge>
                      <Badge className="bg-pink-500 text-white font-bold">Análise IA</Badge>
                    </div>
                  </div>
                  <Button 
                    onClick={abrirBigSpy}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-8 py-4 text-lg shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
                  >
                    <Zap className="w-6 h-6 mr-3" />
                    Acessar BigSpy
                    <ExternalLink className="w-5 h-5 ml-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 backdrop-blur-sm border-2 border-slate-700 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold">
                  <Target className="w-6 h-6 mr-3 text-cyan-400" />
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Pesquisa Inteligente de Nicho
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300">Nicho Principal</label>
                    <Input 
                      placeholder="Ex: Emagrecimento" 
                      value={nicho} 
                      onChange={e => setNicho(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500 focus:ring-cyan-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300">Produto/Serviço</label>
                    <Input 
                      placeholder="Ex: Curso de dieta" 
                      value={produto} 
                      onChange={e => setProduto(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300">País Alvo</label>
                    <Input 
                      placeholder="BR" 
                      value={paisAlvo} 
                      onChange={e => setPaisAlvo(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300">Orçamento (R$)</label>
                    <Input 
                      placeholder="1000" 
                      value={orcamento} 
                      onChange={e => setOrcamento(e.target.value)}
                      type="number"
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <Button 
                  onClick={buscarCampanhas} 
                  className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-4 text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                  disabled={loadingNicho}
                >
                  {loadingNicho ? (
                    <>
                      <RefreshCw className="w-6 h-6 mr-3 animate-spin" />
                      Analisando com IA...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-6 h-6 mr-3" />
                      🚀 Analisar Nicho com IA
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Resultados da Pesquisa */}
            {loadingNicho ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-64 bg-gradient-to-r from-slate-700 to-slate-600 rounded-xl"></div>
                  </div>
                ))}
              </div>
            ) : dadosNicho ? (
              <div className="space-y-8">
                {/* Insights Gerais */}
                <Card className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-2 border-emerald-500/50 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                      <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                        💡 Insights do Nicho: {dadosNicho.nicho}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="text-center p-6 bg-slate-800/50 rounded-xl border border-emerald-500/30">
                        <div className="text-4xl font-black text-emerald-400 mb-2">
                          {formatMoney(dadosNicho.insights?.recommended_budget)}
                        </div>
                        <div className="text-sm font-semibold text-slate-300">💰 Orçamento Sugerido</div>
                      </div>
                      <div className="text-center p-6 bg-slate-800/50 rounded-xl border border-teal-500/30">
                        <div className="text-4xl font-black text-teal-400 mb-2">
                          {dadosNicho.insights?.avg_performance_score?.toFixed(2)}
                        </div>
                        <div className="text-sm font-semibold text-slate-300">⭐ Score Médio</div>
                      </div>
                      <div className="text-center p-6 bg-slate-800/50 rounded-xl border border-cyan-500/30">
                        <div className="text-4xl font-black text-cyan-400 mb-2">
                          {dadosNicho.total_ads_found}
                        </div>
                        <div className="text-sm font-semibold text-slate-300">📊 Anúncios Encontrados</div>
                      </div>
                    </div>
                    <div className="p-6 bg-slate-800/50 rounded-xl">
                      <h4 className="font-bold text-xl mb-4 text-white">🏷️ Palavras-chave Mais Usadas:</h4>
                      <div className="flex flex-wrap gap-3">
                        {dadosNicho.insights?.top_words?.slice(0, 8).map((word, i) => (
                          <Badge key={i} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-4 py-2 text-sm">
                            #{word}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Top Campanhas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {dadosNicho.top_ads?.map((ad, i) => (
                    <Card key={i} className="bg-slate-800/30 backdrop-blur-sm border-2 border-slate-700 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="text-xl font-bold">🏆 Campanha #{i + 1}</span>
                          {getPerformanceBadge(ad.performance_score * 4, ad.estimated_ctr)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                            <span className="text-slate-300 font-semibold">📄 Página:</span>
                            <span className="font-bold text-white">{ad.page_name}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                            <span className="text-slate-300 font-semibold">💵 CPM:</span>
                            <span className="font-bold text-emerald-400 text-lg">
                              {formatMoney(ad.calculated_cpm)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                            <span className="text-slate-300 font-semibold">📊 CTR Estimado:</span>
                            <span className="font-bold text-cyan-400 text-lg">{ad.estimated_ctr?.toFixed(2)}%</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                            <span className="text-slate-300 font-semibold">📅 Dias Ativa:</span>
                            <span className="font-bold text-purple-400 text-lg">{ad.days_active}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                            <span className="text-slate-300 font-semibold">⭐ Score:</span>
                            <span className="font-bold text-orange-400 text-lg">
                              {ad.performance_score?.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : null}
          </TabsContent>

          {/* Tab do Dashboard */}
          <TabsContent value="dashboard" className="space-y-8">
            {loadingDashboard ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-40 bg-gradient-to-r from-slate-700 to-slate-600 rounded-xl"></div>
                  </div>
                ))}
              </div>
            ) : dadosDashboard ? (
              <>
                {/* Métricas Principais */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-2 border-cyan-500/50 shadow-2xl transform hover:scale-105 transition-all">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-300 mb-2">📈 ROAS Médio</p>
                          <p className="text-4xl font-black text-cyan-400">
                            {dadosDashboard.summary?.avg_roas?.toFixed(2)}x
                          </p>
                        </div>
                        <div className="p-4 bg-cyan-500/20 rounded-full">
                          <TrendingUp className="w-12 h-12 text-cyan-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-emerald-500/20 to-green-600/20 border-2 border-emerald-500/50 shadow-2xl transform hover:scale-105 transition-all">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-300 mb-2">💰 Gasto Total</p>
                          <p className="text-4xl font-black text-emerald-400">
                            {formatMoney(dadosDashboard.summary?.total_spend)}
                          </p>
                        </div>
                        <div className="p-4 bg-emerald-500/20 rounded-full">
                          <DollarSign className="w-12 h-12 text-emerald-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 border-2 border-purple-500/50 shadow-2xl transform hover:scale-105 transition-all">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-300 mb-2">🎯 Conversões</p>
                          <p className="text-4xl font-black text-purple-400">
                            {dadosDashboard.summary?.total_conversions || 0}
                          </p>
                        </div>
                        <div className="p-4 bg-purple-500/20 rounded-full">
                          <Target className="w-12 h-12 text-purple-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-orange-500/20 to-red-600/20 border-2 border-orange-500/50 shadow-2xl transform hover:scale-105 transition-all">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-300 mb-2">⚡ Campanhas Ativas</p>
                          <p className="text-4xl font-black text-orange-400">
                            {dadosDashboard.summary?.total_active_campaigns || 0}
                          </p>
                        </div>
                        <div className="p-4 bg-orange-500/20 rounded-full">
                          <Activity className="w-12 h-12 text-orange-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Top Nichos e Campanhas */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="bg-slate-800/30 backdrop-blur-sm border-2 border-slate-700 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold">
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                          🏆 Top Nichos Performando
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {dadosDashboard.top_niches?.slice(0, 5).map((nicho, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-xl border border-slate-600 hover:border-yellow-500/50 transition-all">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center font-bold text-white">
                                {i + 1}
                              </div>
                              <div>
                                <div className="font-bold text-white text-lg">{nicho.nicho}</div>
                                <div className="text-sm text-slate-400">{nicho.produto}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-emerald-400">
                                Score: {nicho.performance_media?.toFixed(2)}
                              </div>
                              <div className="text-sm text-slate-400">
                                {nicho.total_pesquisas} pesquisas
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/30 backdrop-blur-sm border-2 border-slate-700 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold">
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          🚀 Campanhas Top Performance
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {dadosDashboard.top_campaigns?.slice(0, 5).map((campaign, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-xl border border-slate-600 hover:border-purple-500/50 transition-all">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-white">
                                {i + 1}
                              </div>
                              <div className="flex-1">
                                <div className="font-bold text-white truncate max-w-48">{campaign.campaign_name}</div>
                                <div className="text-sm text-slate-400">
                                  ROAS: {campaign.roas_medio?.toFixed(2)}x | CTR: {campaign.ctr_medio?.toFixed(2)}%
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-emerald-400">
                                {formatMoney(campaign.gasto_total)}
                              </div>
                              <div className="text-sm text-slate-400">
                                {campaign.conversoes_total} conv.
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Insights e Recomendações */}
                {dadosDashboard.insights?.recommendations?.length > 0 && (
                  <Card className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-2 border-amber-500/50 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center text-2xl font-bold">
                        <AlertTriangle className="w-6 h-6 mr-3 text-amber-400" />
                        <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                          💡 Recomendações Inteligentes
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {dadosDashboard.insights.recommendations.map((rec, i) => (
                          <div key={i} className="flex items-center p-4 bg-amber-500/10 rounded-xl border border-amber-500/30">
                            <CheckCircle className="w-6 h-6 mr-4 text-amber-400 flex-shrink-0" />
                            <span className="text-white font-medium">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card className="bg-slate-800/30 backdrop-blur-sm border-2 border-slate-700 shadow-2xl">
                <CardContent className="p-12 text-center">
                  <div className="animate-pulse">
                    <Activity className="w-16 h-16 mx-auto mb-6 text-slate-400" />
                    <p className="text-slate-400 text-xl">Carregando dados do dashboard...</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Tab de Campanhas */}
          <TabsContent value="campaigns" className="space-y-8">
            <Card className="bg-slate-800/30 backdrop-blur-sm border-2 border-slate-700 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    🎯 Gerenciamento de Campanhas
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="p-6 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                    <Activity className="w-12 h-12 text-orange-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    🚀 Campanhas em Tempo Real
                  </h3>
                  <p className="text-slate-300 mb-6 text-lg max-w-2xl mx-auto">
                    Esta seção mostrará suas campanhas ativas quando conectada ao webhook.
                    Configure o endpoint do webhook para ver campanhas em tempo real.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-8 py-3">
                      <Settings className="w-5 h-5 mr-2" />
                      Configurar Webhook
                    </Button>
                    <Button 
                      onClick={abrirBigSpy}
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold px-8 py-3"
                    >
                      <Search className="w-5 h-5 mr-2" />
                      Pesquisar no BigSpy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Configurações */}
          <TabsContent value="config" className="space-y-8">
            <Card className="bg-slate-800/30 backdrop-blur-sm border-2 border-slate-700 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    🔗 Configuração de Checkouts
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-slate-300 text-lg">
                  Configure as API Keys das plataformas para integração automática:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(apiKeys).map(([platform, key]) => (
                    <div key={platform} className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-300 capitalize">
                        {platform} API Key
                      </label>
                      <Input
                        placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} API Key`}
                        value={key}
                        onChange={e => setApiKeys(prev => ({ ...prev, [platform]: e.target.value }))}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500"
                        type="password"
                      />
                    </div>
                  ))}
                </div>
                <Button className="mt-8 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold px-8 py-3 shadow-lg">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  💾 Salvar Configurações
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 backdrop-blur-sm border-2 border-slate-700 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    ⚙️ Configuração do Webhook
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-semibold mb-3 text-slate-300">🌐 URL Base do N8N</label>
                    <Input 
                      placeholder="https://seu-n8n-instance.com/webhook"
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500 focus:ring-cyan-500 text-lg py-3"
                      defaultValue={WEBHOOK_BASE_URL}
                    />
                  </div>
                  <div className="p-6 bg-slate-700/30 rounded-xl border border-slate-600">
                    <h4 className="text-lg font-bold text-white mb-4">📡 Endpoints Configurados:</h4>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 bg-slate-600/50 rounded-lg">
                        <Globe className="w-5 h-5 mr-3 text-cyan-400" />
                        <code className="text-cyan-400 font-mono">/research-niche</code>
                        <span className="ml-3 text-slate-300">- Pesquisa de nicho</span>
                      </div>
                      <div className="flex items-center p-3 bg-slate-600/50 rounded-lg">
                        <Globe className="w-5 h-5 mr-3 text-emerald-400" />
                        <code className="text-emerald-400 font-mono">/dashboard</code>
                        <span className="ml-3 text-slate-300">- Dados do dashboard</span>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold px-8 py-3 shadow-lg">
                    <Settings className="w-5 h-5 mr-2" />
                    🔧 Testar Conexão
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* BigSpy Integration Settings */}
            <Card className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-500/50 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    🔍 BigSpy Integration Settings
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-xl text-white">⚙️ Configurações de Pesquisa</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">🎯 Plataformas Preferidas</label>
                        <div className="flex flex-wrap gap-2">
                          {['Facebook', 'Instagram', 'YouTube', 'TikTok', 'Google'].map(platform => (
                            <Badge key={platform} className="bg-orange-500 text-white font-bold cursor-pointer hover:bg-orange-600 transition-all">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">🌍 Países de Interesse</label>
                        <Input 
                          placeholder="BR, US, UK, CA..."
                          className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-orange-500 focus:ring-orange-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-bold text-xl text-white">🚀 Ações Rápidas</h4>
                    <div className="space-y-3">
                      <Button 
                        onClick={abrirBigSpy}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 shadow-lg"
                      >
                        <Search className="w-5 h-5 mr-2" />
                        🔍 Abrir BigSpy
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 shadow-lg">
                        <Star className="w-5 h-5 mr-2" />
                        ⭐ Salvar Favoritos
                      </Button>
                      <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3 shadow-lg">
                        <Database className="w-5 h-5 mr-2" />
                        📊 Exportar Dados
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
