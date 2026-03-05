import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/seo/Breadcrumb'

export const metadata: Metadata = {
  title: 'Termos de Uso - RifaFlow',
  description:
    'Termos de uso da plataforma RifaFlow. Leia sobre as condições de uso, responsabilidades, pagamentos e política de sorteios.',
  alternates: { canonical: '/termos-de-uso' },
}

export default function TermosPage() {
  return (
    <div className="mesh-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <Breadcrumb items={[{ name: 'Termos de Uso', url: '/termos-de-uso' }]} />
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-8">Termos de Uso</h1>
        <p className="text-sm text-gray-500 mb-8">Última atualização: 1 de março de 2026</p>

        <div className="prose-dark space-y-8">
          <section className="glass rounded-2xl p-6 space-y-3">
            <h2 className="text-xl font-bold text-white">1. Aceitação dos Termos</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Ao acessar e utilizar a plataforma RifaFlow, você concorda com estes Termos de Uso.
              Se não concordar com qualquer parte destes termos, não utilize a plataforma.
              O RifaFlow se reserva o direito de alterar estes termos a qualquer momento,
              sendo responsabilidade do usuário verificar periodicamente as atualizações.
            </p>
          </section>

          <section className="glass rounded-2xl p-6 space-y-3">
            <h2 className="text-xl font-bold text-white">2. Descrição do Serviço</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              O RifaFlow é uma plataforma tecnológica que permite a criadores publicar e gerenciar
              rifas online com sorteio criptograficamente verificável e pagamento via PIX.
              O RifaFlow atua como intermediário tecnológico e não é responsável pela entrega dos
              prêmios, que é obrigação exclusiva do criador da rifa.
            </p>
          </section>

          <section className="glass rounded-2xl p-6 space-y-3">
            <h2 className="text-xl font-bold text-white">3. Cadastro e Conta</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Para criar rifas, o usuário deve se cadastrar fornecendo informações verdadeiras.
              Cada pessoa pode ter apenas uma conta. O usuário é responsável pela segurança
              de suas credenciais de acesso. O RifaFlow pode suspender ou encerrar contas
              que violem estes termos ou apresentem comportamento fraudulento.
            </p>
          </section>

          <section className="glass rounded-2xl p-6 space-y-3">
            <h2 className="text-xl font-bold text-white">4. Criação de Rifas</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              O criador declara que possui o prêmio anunciado ou condições de adquiri-lo.
              É proibido criar rifas com conteúdo ilegal, ofensivo ou enganoso.
              O criador se compromete a realizar o sorteio na data anunciada e entregar
              o prêmio ao ganhador em até 7 dias úteis, salvo acordo diferente.
            </p>
          </section>

          <section className="glass rounded-2xl p-6 space-y-3">
            <h2 className="text-xl font-bold text-white">5. Pagamentos e Taxas</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              A criação de rifas é gratuita. O RifaFlow cobra uma taxa de 5% sobre cada
              número vendido, descontada automaticamente da receita do criador.
              O comprador paga apenas o valor do número — sem taxas adicionais.
              Pagamentos são processados via PIX com confirmação instantânea através do
              gateway de pagamento Asaas.
            </p>
          </section>

          <section className="glass rounded-2xl p-6 space-y-3">
            <h2 className="text-xl font-bold text-white">6. Sorteio Verificável</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Todos os sorteios utilizam hash criptográfico SHA-256 que é publicado antes
              do resultado. O resultado é gerado de forma aleatória e matematicamente
              verificável. Nenhuma das partes, incluindo o RifaFlow, pode manipular
              o resultado do sorteio.
            </p>
          </section>

          <section className="glass rounded-2xl p-6 space-y-3">
            <h2 className="text-xl font-bold text-white">7. Cancelamento e Reembolso</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Rifas sem vendas podem ser canceladas a qualquer momento.
              Rifas com vendas canceladas geram reembolso automático a todos os compradores
              via PIX. O prazo para estorno é de até 5 dias úteis.
              O comprador pode solicitar reembolso antes do sorteio entrando em contato
              com o criador.
            </p>
          </section>

          <section className="glass rounded-2xl p-6 space-y-3">
            <h2 className="text-xl font-bold text-white">8. Limitação de Responsabilidade</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              O RifaFlow não é responsável por rifas fraudulentas, não entrega de prêmios,
              ou disputas entre criadores e compradores. A plataforma oferece ferramentas
              de verificação e transparência, mas a responsabilidade pela conduta é dos
              usuários. Em caso de fraude comprovada, o RifaFlow poderá suspender a conta
              do infrator e auxiliar nas investigações.
            </p>
          </section>

          <section className="glass rounded-2xl p-6 space-y-3">
            <h2 className="text-xl font-bold text-white">9. Propriedade Intelectual</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Todo o conteúdo da plataforma, incluindo marca, design, código e textos,
              é propriedade do RifaFlow. O usuário mantém os direitos sobre o conteúdo
              que publica (fotos, descrições), mas concede ao RifaFlow licença para
              exibição na plataforma.
            </p>
          </section>

          <section className="glass rounded-2xl p-6 space-y-3">
            <h2 className="text-xl font-bold text-white">10. Contato</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Para dúvidas sobre estes termos, entre em contato pelo email
              contato@rifaflow.com.br ou pela nossa página de contato.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
