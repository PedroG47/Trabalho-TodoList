<template>
  <div class="container mt-2">
    <b-card bg-variant="info">
      <template #header>
      <h4 class="mb-0">Formulário</h4>
    </template>
      <b-form>
        <b-form-group
          label="Titulo"
          label-for="subject"
        >
          <b-form-input
            id="subject"
            v-model="form.subject"
            type="text"
            placeholder="Ex: Programar"
            required
            autocomplete="off"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Descrição"
          label-for="description"
        >
          <b-form-textarea
            id="description"
            v-model="form.description"
            type="text"
            placeholder="Ex: Preciso programar um site"
            required
            autocomplete="off"
          ></b-form-textarea>
        </b-form-group>

        <b-form-group
          label="Status"
          label-for="Status"
        >
          <b-form-select
            id="status"
            v-model="form.status"
            :options="optionsList"
          ></b-form-select>
        </b-form-group>

        <b-button type="submit" variant="warning" @click="saveTask"> Cadastrar </b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import ToastMixin from "@/mixins/toastMixin.js";
import TasksModel from "@/models/TasksModel";
import Status from "@/valueObjects/status";

export default {
  name: "Form",

  mixins: [ToastMixin],

  data() {
    return {
      form: {
        subject: "",
        description: "",
        status: Status.OPEN
      },
      methodSave: "new",
      optionsList: [
        { value: Status.OPEN, text: "Aberto" },
        { value: Status.FINISHED, text: "Concluído" },
        { value: Status.ARCHIVED, text: "Arquivado" }
      ]
    }
  },

  async created() {
    if(this.$route.params.taskId){
      this.methodSave = "update";
      this.form = await TasksModel.find(this.$route.params.taskId)
    }
  },

  methods: {
    saveTask() {
      if(this.methodSave === "update"){
        this.form.save();

        this.showToast("success", "Sucesso!", "Tarefa atualizada com suceso");
        this.$router.push({ name: "list" });
        return;
      }

      const task = new TasksModel(this.form);
      task.save();


      this.showToast("success", "Sucesso!", "Tarefa criada com suceso");
      this.$router.push({ name: "list" });
    }
  }
}
</script>
