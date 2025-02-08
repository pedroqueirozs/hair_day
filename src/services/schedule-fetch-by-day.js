import { apiConfig } from "./api-config.js";
import dayjs from "dayjs";

export async function scheduleFetchByDay({ date }) {
  try {
    //Fazendo a requisição.
    const response = await fetch(`${apiConfig.baseURL}/schedules`);

    //Pegar os dados da requisição e converte para JSON.
    const data = await response.json();

    //Filtra os agendamento pelo dia selecionado.
    const dailySchedules = data.filter((schedule) =>
      dayjs(date).isSame(schedule.when, "day")
    );

    return dailySchedules;
  } catch (error) {
    console.log(error);
    alert("Não foi possível buscar os agendamentos do dia selecionado.");
  }
}
