import { scheduleCancel } from "../../services/schedule-cancel.js";
import { schedulesDay } from "./load.js";

const periods = document.querySelectorAll(".period");

//Gerar evento de click para cada lista(Manhã, tarde e noite).
periods.forEach((period) => {
  //Capturar o evento de click na lista.
  period.addEventListener("click", async (event) => {
    if (event.target.classList.contains("cancel-icon")) {
      //Obtém a li pai do elemento clicado.
      const item = event.target.closest("li");

      //Pega o ID do agendamento para remover.
      const { id } = item.dataset;

      //Confirma que o ID foi selecionado.
      if (id) {
        const isConfirm = confirm(
          "Tem certeza que deseja cancelar o agendamento?"
        );
        if (isConfirm) {
          //Faz a requisição na API para cancelar.
          await scheduleCancel({ id });
          schedulesDay();
        }
      }
    }
  });
});
