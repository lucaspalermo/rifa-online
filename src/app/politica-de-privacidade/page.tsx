import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/seo/Breadcrumb'

export const metadata: Metadata = {
  title: 'Política de Privacidade - RifaFlow',
  description:
    'Política de privacidade do RifaFlow. Saiba como coletamos, usamos e protegemos seus dados pessoais na plataforma de rifas online.',
  alternates: { canonical: '/politica-de-privacidade' },
}

export default function PrivacidadePage() {
  return (
    <div className="mesh-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <Breadcrumb items={[{ name: 'Política de Privacidade', url: '/politica-de-privacidade' }]} />
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-8">Política de Privacidade</h1>
        <p className="text-sm text-gray-500 mb-8">Última atualização: 1 de março de 2026</p>

        <div className="space-y-8">
          <section className="glass rounded-2xl p-6 space-y-3">
            <h2 className="text-xl font-bold text-white">1. Dados que Coletamos</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Coletamos as seguintes informações fornecidas voluntariamente por você:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 pl-2">
              <li>Nome completo, email e telefone (cadastro)</li>
              <li>CPF (para processamento de pagamentos via PIX)</li>
              <li>Dados de navegação (cookies, IP, dispositivo)</li>
              <li>Informações de transações (compras e vendas de números)</li>
            </ul>
          </section>

          <section className="glass rounded-2xl p-6 space-y-3">
            <h2 className="text-xl font-bold text-white">2. Como Usamos seus Dados</h2>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 pl-2">
              <li>Processar pagamentos e confirmar transações via PIX</li>
              <li>Manter a segurança da plataforma e prevenir fraudes</li>
              <li>Enviar notificações sobre compras, sorteios e resultados</li>
              <li>Melhorar a experiência do usuário na plataforma</li>
              <li>Cumprir obrigações legais e regulatórias</li>
            </ul>
          </section>

          <section className="glass rounded-2xl p-6 space-y-3">
            <h2 className="text-xl font-bold text-white">3. Compartilhamento de Dados</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Seus dados pessoais não são vendidos a terceiros. Compartilhamos dados apenas com:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 pl-2">
              <li>Gateway de pagamento (Asaas) para processamento de PIX</li>
              <li>Criadores de rifas (nome parcial do comprador para transparência)</li>
              <li>Autoridades competentes quando exigido por lei</li>
            </ul>
          </section>

          <section className="glass rounded-2xl p-6 space-y-3">
            <h2 className="text-xl font-bold text-white">4. Proteção de Dados</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Utilizamos criptografia em todas as comunicações (HTTPS/TLS).
              Senhas são armazenadas com hash bcrypt. Dados sensíveis como CPF são
              acessados apenas quando necessário para processamento de pagamentos.
              Realizamos backups regulares e monitoramos acessos não autorizados.
            </p>
          </section>

          <section className="glass rounded-2xl p-6 space-y-3">
            <h2 className="text-xl font-bold text-white">5. Cookies</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Utilizamos cookies essenciais para autenticação (JWT httpOnly),
              preferências do usuário e análises de uso anônimas. Você pode
              desabilitar cookies no navegador, mas isso pode afetar funcionalidades
              da plataforma.
            </p>
          </section>

          <section className="glass rounded-2xl p-6 space-y-3">
            <h2 className="text-xl font-bold text-white">6. Seus Direitos (LGPD)</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Em conformidade com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 pl-2">
              <li>Acessar todos os seus dados pessoais armazenados</li>
              <li>Corrigir dados incompletos ou desatualizados</li>
              <li>Solicitar a exclusão de seus dados pessoais</li>
              <li>Revogar o consentimento para tratamento de dados</li>
              <li>Portabilidade dos dados para outro serviço</li>
            </ul>
            <p className="text-gray-300 text-sm leading-relaxed mt-2">
              Para exercer estes direitos, entre em contato pelo email privacidade@rifaflow.com.br.
            </p>
          </section>

          <section className="glass rounded-2xl p-6 space-y-3">
            <h2 className="text-xl font-bold text-white">7. Retenção de Dados</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Mantemos seus dados enquanto sua conta estiver ativa. Dados de transações
              são mantidos por 5 anos para fins fiscais e legais. Após exclusão da conta,
              dados pessoais são removidos em até 30 dias, exceto quando exigido por lei.
            </p>
          </section>

          <section className="glass rounded-2xl p-6 space-y-3">
            <h2 className="text-xl font-bold text-white">8. Contato do DPO</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Para questões sobre privacidade, contate nosso Encarregado de Proteção de Dados:
              privacidade@rifaflow.com.br.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
