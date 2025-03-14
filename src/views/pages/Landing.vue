<template>
    <div>
        <!-- Topbar -->
        <div class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static">
            <TopbarWidget />
        </div>

        <!-- Formulário -->
        <div class="bg-surface-0 dark:bg-surface-900 min-h-screen flex items-center justify-center p-4">
            <div class="landing-wrapper w-full max-w-4xl">
                <!-- Barra de Progresso -->
                <div class="mb-8">
                    <ProgressBar :value="progress" :showValue="false" class="h-2" />
                    <div class="text-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Progresso: {{ progress }}%
                    </div>
                </div>

                <!-- Formulário em Etapas -->
                <div class="bg-surface-50 dark:bg-surface-800 p-8 rounded-lg shadow-lg">
                    <h2 class="text-2xl font-bold mb-6 text-center">Formulário de Cadastro</h2>

                    <!-- Etapa 1: Informações Pessoais -->
                    <div v-if="step === 1">
                        <h3 class="text-xl font-semibold mb-4">Informações Pessoais</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Nome -->
                            <div class="mb-4">
                                <label for="name" class="block text-sm font-medium mb-2">Nome <span class="text-red-500">*</span></label>
                                <InputText id="name" v-model="form.name" class="w-full"
                                    :class="{ 'p-invalid': errors.name }" />
                                <small v-if="errors.name" class="p-error">Nome é obrigatório.</small>
                            </div>

                            <!-- Sobrenome -->
                            <div class="mb-4">
                                <label for="sobrenome" class="block text-sm font-medium mb-2">Sobrenome <span class="text-red-500">*</span></label>
                                <InputText id="sobrenome" v-model="form.sobrenome" class="w-full"
                                    :class="{ 'p-invalid': errors.sobrenome }" />
                                <small v-if="errors.sobrenome" class="p-error">Sobrenome é obrigatório.</small>
                            </div>

                            <!-- Sexo -->
                            <div class="mb-4">
                                <label for="sexo" class="block text-sm font-medium mb-2">Sexo <span class="text-red-500">*</span></label>
                                <Dropdown id="sexo" v-model="form.sexo" :options="['Masculino', 'Feminino', 'Outro']"
                                    class="w-full" :class="{ 'p-invalid': errors.sexo }" />
                                <small v-if="errors.sexo" class="p-error">Sexo é obrigatório.</small>
                            </div>

                            <!-- Idade -->
                            <div class="mb-4">
                                <label for="idade" class="block text-sm font-medium mb-2">Idade <span class="text-red-500">*</span></label>
                                <InputNumber id="idade" v-model="form.idade" class="w-full"
                                    :class="{ 'p-invalid': errors.idade }" />
                                <small v-if="errors.idade" class="p-error">Idade é obrigatória.</small>
                            </div>

                            <!-- CPF -->
                            <div class="mb-4">
                                <label for="cpf" class="block text-sm font-medium mb-2">CPF <span class="text-red-500">*</span></label>
                                <InputMask id="cpf" v-model="form.cpf" mask="999.999.999-99" class="w-full"
                                    :class="{ 'p-invalid': errors.cpf }" />
                                <small v-if="errors.cpf" class="p-error">CPF é obrigatório.</small>
                            </div>
                        </div>
                    </div>

                    <!-- Etapa 2: Contato -->
                    <div v-if="step === 2">
                        <h3 class="text-xl font-semibold mb-4">Contato</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Email -->
                            <div class="mb-4">
                                <label for="email" class="block text-sm font-medium mb-2">Email <span class="text-red-500">*</span></label>
                                <InputText id="email" v-model="form.email" class="w-full"
                                    :class="{ 'p-invalid': errors.email }" />
                                <small v-if="errors.email" class="p-error">Email é obrigatório.</small>
                            </div>

                            <!-- Telefone -->
                            <div class="mb-4">
                                <label for="telefone" class="block text-sm font-medium mb-2">Telefone <span class="text-red-500">*</span></label>
                                <InputMask id="telefone" v-model="form.telefone" mask="(99) 9999-9999" class="w-full"
                                    :class="{ 'p-invalid': errors.telefone }" />
                                <small v-if="errors.telefone" class="p-error">Telefone é obrigatório.</small>
                            </div>

                            <!-- Celular -->
                            <div class="mb-4">
                                <label for="celular" class="block text-sm font-medium mb-2">Celular <span class="text-red-500">*</span></label>
                                <InputMask id="celular" v-model="form.celular" mask="(99) 99999-9999" class="w-full"
                                    :class="{ 'p-invalid': errors.celular }" />
                                <small v-if="errors.celular" class="p-error">Celular é obrigatório.</small>
                            </div>
                        </div>
                    </div>

                    <!-- Etapa 3: Endereço -->
                    <div v-if="step === 3">
                        <h3 class="text-xl font-semibold mb-4">Endereço</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Logradouro -->
                            <div class="mb-4">
                                <label for="logradouro" class="block text-sm font-medium mb-2">Logradouro <span class="text-red-500">*</span></label>
                                <InputText id="logradouro" v-model="form.logradouro" class="w-full"
                                    :class="{ 'p-invalid': errors.logradouro }" />
                                <small v-if="errors.logradouro" class="p-error">Logradouro é obrigatório.</small>
                            </div>

                            <!-- Número -->
                            <div class="mb-4">
                                <label for="numero" class="block text-sm font-medium mb-2">Número <span class="text-red-500">*</span></label>
                                <InputText id="numero" v-model="form.numero" class="w-full"
                                    :class="{ 'p-invalid': errors.numero }" />
                                <small v-if="errors.numero" class="p-error">Número é obrigatório.</small>
                            </div>

                            <!-- Complemento -->
                            <div class="mb-4">
                                <label for="complemento" class="block text-sm font-medium mb-2">Complemento</label>
                                <InputText id="complemento" v-model="form.complemento" class="w-full" />
                            </div>

                            <!-- Bairro -->
                            <div class="mb-4">
                                <label for="bairro" class="block text-sm font-medium mb-2">Bairro <span class="text-red-500">*</span></label>
                                <InputText id="bairro" v-model="form.bairro" class="w-full"
                                    :class="{ 'p-invalid': errors.bairro }" />
                                <small v-if="errors.bairro" class="p-error">Bairro é obrigatório.</small>
                            </div>

                            <!-- Cidade -->
                            <div class="mb-4">
                                <label for="cidade" class="block text-sm font-medium mb-2">Cidade <span class="text-red-500">*</span></label>
                                <InputText id="cidade" v-model="form.cidade" class="w-full"
                                    :class="{ 'p-invalid': errors.cidade }" />
                                <small v-if="errors.cidade" class="p-error">Cidade é obrigatória.</small>
                            </div>

                            <!-- Estado -->
                            <div class="mb-4">
                                <label for="estado" class="block text-sm font-medium mb-2">Estado <span class="text-red-500">*</span></label>
                                <Dropdown id="estado" v-model="form.estado" :options="estados" class="w-full"
                                    :class="{ 'p-invalid': errors.estado }" />
                                <small v-if="errors.estado" class="p-error">Estado é obrigatório.</small>
                            </div>

                            <!-- CEP -->
                            <div class="mb-4">
                                <label for="cep" class="block text-sm font-medium mb-2">CEP <span class="text-red-500">*</span></label>
                                <InputMask id="cep" v-model="form.cep" mask="99999-999" class="w-full"
                                    :class="{ 'p-invalid': errors.cep }" />
                                <small v-if="errors.cep" class="p-error">CEP é obrigatório.</small>
                            </div>
                        </div>
                    </div>

                    <!-- Etapa 4: LGPD e Compartilhamento de Dados -->
                    <div v-if="step === 4">
                        <h3 class="text-xl font-semibold mb-4">Termos de Consentimento</h3>
                        <Divider />
                        <div class="mb-4">
                            <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
                                Concordo com o tratamento dos meus dados pessoais de acordo com a Lei Geral de Proteção
                                de Dados (Lei nº 13.709/2018).
                                Os dados coletados serão utilizados exclusivamente para fins de cadastro, comunicação e
                                melhoria dos serviços oferecidos.
                                Aceito que meus dados possam ser compartilhados com parceiros comerciais, desde que seja
                                estritamente necessário para a prestação dos serviços contratados.
                                Posso revogar meu consentimento a qualquer momento, solicitando a exclusão dos meus
                                dados através do canal de atendimento disponível.
                            </p>
                            <Divider />
                            <Checkbox v-model="form.lgpd" :binary="true"
                                :class="{ 'p-invalid': errors.lgpd }" />
                            <label for="lgpd" class="ml-2 text-sm font-medium">Concordo com os termos acima. <span class="text-red-500">*</span></label>
                            <small v-if="errors.lgpd" class="p-error">Você precisa concordar com os termos.</small>
                        </div>
                    </div>

                    <!-- Botões de Navegação -->
                    <div class="flex justify-between mt-8">
                        <Button v-if="step > 1" label="Anterior" @click="previousStep" class="p-button-secondary" />
                        <Button v-if="step < 4" label="Próximo" @click="nextStep" class="ml-auto"
                            :disabled="!isCurrentStepValid" />
                        <Button v-if="step === 4" label="Enviar" @click="submitForm" :disabled="!form.lgpd"
                            class="ml-auto" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TopbarWidget from '@/components/landing/TopbarWidget.vue';
import Divider from 'primevue/divider';


export default {
    components: {
        TopbarWidget,
    },
    data() {
        return {
            step: 1, // Etapa atual do formulário
            form: {
                name: '',
                sobrenome: '',
                sexo: '',
                idade: null,
                cpf: '',
                email: '',
                telefone: '',
                celular: '',
                logradouro: '',
                numero: '',
                complemento: '',
                bairro: '',
                cidade: '',
                estado: '',
                cep: '',
                lgpd: false,
            },
            errors: {
                name: false,
                sobrenome: false,
                sexo: false,
                idade: false,
                cpf: false,
                email: false,
                telefone: false,
                celular: false,
                logradouro: false,
                numero: false,
                bairro: false,
                cidade: false,
                estado: false,
                cep: false,
                lgpd: false,
            },
            estados: [
                'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
            ],
        };
    },
    computed: {
        // Calcula o progresso com base na etapa atual
        progress() {
            return (this.step / 4) * 100;
        },
        // Verifica se a etapa atual é válida
        isCurrentStepValid() {
            switch (this.step) {
                case 1:
                    return !!this.form.name && !!this.form.sobrenome && !!this.form.sexo && !!this.form.idade && !!this.form.cpf;
                case 2:
                    return !!this.form.email && !!this.form.telefone && !!this.form.celular;
                case 3:
                    return !!this.form.logradouro && !!this.form.numero && !!this.form.bairro && !!this.form.cidade && !!this.form.estado && !!this.form.cep;
                default:
                    return true;
            }
        },
    },
    methods: {
        // Navega para a próxima etapa
        nextStep() {
            if (this.isCurrentStepValid) {
                this.step++;
                this.clearErrors();
            } else {
                this.showErrors();
            }
        },
        // Volta para a etapa anterior
        previousStep() {
            if (this.step > 1) this.step--;
        },
        // Envia o formulário
        submitForm() {
            if (this.form.lgpd) {
                console.log('Formulário enviado:', this.form);
                // Lógica para enviar o formulário
            } else {
                this.errors.lgpd = true;
            }
        },
        // Mostra erros para os campos obrigatórios
        showErrors() {
            this.errors = {
                name: !this.form.name,
                sobrenome: !this.form.sobrenome,
                sexo: !this.form.sexo,
                idade: !this.form.idade,
                cpf: !this.form.cpf,
                email: !this.form.email,
                telefone: !this.form.telefone,
                celular: !this.form.celular,
                logradouro: !this.form.logradouro,
                numero: !this.form.numero,
                bairro: !this.form.bairro,
                cidade: !this.form.cidade,
                estado: !this.form.estado,
                cep: !this.form.cep,
                lgpd: !this.form.lgpd,
            };
        },
        // Limpa os erros
        clearErrors() {
            this.errors = {
                name: false,
                sobrenome: false,
                sexo: false,
                idade: false,
                cpf: false,
                email: false,
                telefone: false,
                celular: false,
                logradouro: false,
                numero: false,
                bairro: false,
                cidade: false,
                estado: false,
                cep: false,
                lgpd: false,
            };
        },
    },
};
</script>

<style>
.min-h-screen {
    min-height: 87vh;
}

.p-invalid {
    border-color: #ef4444 !important;
}
</style>