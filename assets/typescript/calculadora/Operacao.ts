interface OperacaoOpcoes {
    onCalculado: any;
}

export default class Operacao {

    private onCalculado: any;
    private memoriaNumero: number = 0;
    private memoriaOperador: string = "";

    constructor(
        opts: OperacaoOpcoes,
        private operacao: string[] = []
    ) {

        this.onCalculado = opts.onCalculado;

    }

    adicionar(valor: string): number {

        if (this.operacao.length === 3) {
            this.calcular();
        }
        return this.operacao.push(valor);
    }

    obterResultado(): string {
        
        let resultado: string = "0";

        try {
            resultado = (eval(this.operacao.join(""))).toString();
        } catch (e) {
            resultado = "ERRO";
        }

        return resultado;
    }

    calcular(): void {
        let resultado = this.obterResultado();

        if (resultado.length > 12) {
            resultado = resultado.substring(0, 12)
        }

        this.operacao = [resultado];

        this.onCalculado(resultado);
    }

    porcentagem(): string {

        if (this.length === 3) {
            
            switch (this.operacao[1]) {
                case "+":
                case "-":

                const porcento = (Number(this.operacao[0]) * Number(this.operacao[2])) / 100;

                this.memoriaNumero = porcento;

                this.ultimaPosicao = porcento.toString();

                return porcento.toString();

                default:

                this.memoriaNumero = Number(this.ultimaPosicao) / 100;

                this.ultimaPosicao = this.memoriaNumero.toString();

                return this.memoriaNumero.toString();
            }
            
        }

        return "0";
    }

    limpar(): void {

        this.operacao = [];
        this.memoriaNumero = 0;
        this.memoriaOperador = "";

    }

    desfazer(): string {
        
        this.operacao.pop();

        return this.length ? this.operacao[0] : "0";
    }

    get ultimaPosicao(): string {
        return this.operacao.length ? this.operacao[this.operacao.length - 1] : "0";
    }

    set ultimaPosicao(valor: string) {
        const ultimoIndex = this.operacao.length ? this.operacao.length - 1 : 0;

        this.operacao[ultimoIndex] = valor;
    }

    get length(): number {
        return this.operacao.length;
    }
}