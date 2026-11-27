/**
 * Spanish and Portuguese text for the fan-platform cards (src/lib/paywall-data.ts).
 * Numbers stay in paywall-data.ts; only the words are here. When a platform's
 * text changes in English, update it here too (npm run i18n:status won't catch it).
 */
import type { Platform } from '../lib/paywall-data';

type Words = Pick<Platform, 'keepLabel' | 'contentLabel' | 'payout' | 'bestFor' | 'watch' | 'disclosure'>;

export const platformText: Record<'es' | 'pt-br', Record<string, Partial<Words>>> = {
	es: {
		fanfix: {
			keepLabel: 'Te quedas con el 80%',
			contentLabel: 'Solo contenido apto para todo público. Nada de desnudos, y moderadores revisan los DMs',
			payout: 'Unos 30 días después del cierre de cada mes',
			bestFor: 'Creadores de lifestyle, belleza, fitness y Gen Z que quieren un club de fans pagado sin contenido adulto',
			watch: 'Sus términos prohíben usar tu cuenta de Fanfix para promocionar plataformas de la competencia',
			disclosure: 'Nuestro fundador asesora a Fanfix',
		},
		onlyfans: {
			keepLabel: 'Te quedas con el 80%',
			contentLabel: 'Permite contenido adulto. También lo usan creadores de fitness, música y cocina',
			payout: 'Revisa su centro de ayuda: nuestras fuentes no cubren los plazos de pago',
			bestFor: 'Creadores cómodos con la reputación adulta de la marca que quieren el público de pago más grande',
			watch: 'Las marcas y algunos procesadores de pago tratan el nombre como adulto, publiques lo que publiques',
		},
		fanvue: {
			keepLabel: 'Te quedas con el 80%',
			contentLabel: 'Permite contenido adulto si lo declaras. Se permiten personajes con IA, con reglas',
			payout: 'Liquidación a 7 días y luego unos 10 días hábiles de procesamiento',
			bestFor: 'Creadores que quieren herramientas tipo OnlyFans en una plataforma más pequeña, incluidos los que usan IA',
			watch: 'La tarifa de lanzamiento del 85% ya no existe. Cobrar fuera de la plataforma puede congelar tus pagos',
		},
		patreon: {
			keepLabel: '10% + cargos de tarjeta',
			contentLabel: 'Hecha para membresías: podcasts, video, arte, escritura, educación',
			payout: 'Se configura en los ajustes de pago de Patreon',
			bestFor: 'Podcasters, YouTubers, artistas y educadores que venden contenido extra y comunidad',
			watch: 'Las suscripciones desde la app de iPhone cuestan hasta 30%. Las páginas creadas antes de agosto de 2025 pueden tener planes antiguos',
		},
		kofi: {
			keepLabel: '5% + cargos de tarjeta',
			contentLabel: 'Propinas, membresías, una tienda y encargos',
			payout: 'Directo a tu cuenta de PayPal o Stripe',
			bestFor: 'Artistas y creadores pequeños que quieren propinas y una tienda simple con la comisión más baja',
			watch: 'Menos herramientas de club de fans (DMs pagados, posts bloqueados) que las plataformas de arriba',
		},
	},
	'pt-br': {
		fanfix: {
			keepLabel: 'Você fica com 80%',
			contentLabel: 'Só conteúdo para todos os públicos. Nada de nudez, e moderadores revisam as DMs',
			payout: 'Cerca de 30 dias depois do fim de cada mês',
			bestFor: 'Criadores de lifestyle, beleza, fitness e Gen Z que querem um clube de fãs pago sem conteúdo adulto',
			watch: 'Os termos proíbem usar sua conta do Fanfix para divulgar plataformas concorrentes',
			disclosure: 'Nosso fundador é consultor do Fanfix',
		},
		onlyfans: {
			keepLabel: 'Você fica com 80%',
			contentLabel: 'Permite conteúdo adulto. Também é usado por criadores de fitness, música e culinária',
			payout: 'Confira a central de ajuda: nossas fontes não cobrem os prazos de pagamento',
			bestFor: 'Criadores à vontade com a fama adulta da marca que querem o maior público pagante',
			watch: 'Marcas parceiras e alguns meios de pagamento tratam o nome como adulto, não importa o que você poste',
		},
		fanvue: {
			keepLabel: 'Você fica com 80%',
			contentLabel: 'Permite conteúdo adulto se você declarar. Personas de IA são permitidas, com regras',
			payout: 'Liquidação em 7 dias e depois cerca de 10 dias úteis de processamento',
			bestFor: 'Criadores que querem ferramentas no estilo OnlyFans numa plataforma menor, inclusive quem usa IA',
			watch: 'A taxa de lançamento de 85% acabou. Receber fora da plataforma pode congelar seus pagamentos',
		},
		patreon: {
			keepLabel: '10% + tarifas de cartão',
			contentLabel: 'Feito para assinaturas: podcasts, vídeo, arte, escrita, educação',
			payout: 'Configurado nas opções de pagamento do Patreon',
			bestFor: 'Podcasters, YouTubers, artistas e educadores que vendem conteúdo extra e comunidade',
			watch: 'Assinaturas feitas pelo app do iPhone custam até 30%. Páginas criadas antes de agosto de 2025 podem estar em planos antigos',
		},
		kofi: {
			keepLabel: '5% + tarifas de cartão',
			contentLabel: 'Gorjetas, assinaturas, uma loja e encomendas',
			payout: 'Direto na sua conta do PayPal ou Stripe',
			bestFor: 'Artistas e criadores menores que querem gorjetas e uma loja simples com a menor taxa',
			watch: 'Menos ferramentas de clube de fãs (DMs pagas, posts bloqueados) que as plataformas acima',
		},
	},
};

/** Dates like "Nov 27, 2026" in each language. */
export function localDate(en: string, locale: 'en' | 'es' | 'pt-br'): string {
	if (locale === 'en') return en;
	const d = new Date(en + ' UTC');
	if (Number.isNaN(d.getTime())) return en;
	return d.toLocaleDateString(locale === 'es' ? 'es-419' : 'pt-BR', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}
