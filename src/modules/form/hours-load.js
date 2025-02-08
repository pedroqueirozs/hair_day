import { openingHours } from "../../utils/opening-hours.js";
import dayjs from "dayjs";
import { hoursClick } from "./hours-click.js";

const hours = document.getElementById("hours");

export function hoursLoad({ date, dailySchedules }) {
  //Limpa a lista de horarios
  hours.innerHTML = "";

  //Recupera a lista de todos os horários ocupados.
  const unavailableHours = dailySchedules.map((schedule) =>
    dayjs(schedule.when).format("HH:mm")
  );

  const opening = openingHours.map((hour) => {
    // Recupera somente a hora
    const [scheduleHour] = hour.split(":");

    //Adiciona a hora na data e verifica se esta no passado
    const isHourPast = dayjs(date).add(scheduleHour, "hour").isBefore(dayjs());

    const available = !unavailableHours.includes(hour) && !isHourPast;
    return {
      hour,
      available,
    };
  });

  //Renderizar os horários
  opening.forEach(({ hour, available }) => {
    const li = document.createElement("li");
    li.classList.add("hour");
    li.classList.add(available ? "hour-available" : "hour-unavailable");

    li.textContent = hour;

    if (hour === "09:00") {
      hourHeaderAdd("Manhã");
    } else if (hour === "13:00") {
      hourHeaderAdd("Tarde");
    } else if (hour === "18:00") {
      hourHeaderAdd("Noite");
    }
    hours.append(li);
  });

  //Adiciona o evento de click nos horários disponíveis.
  hoursClick();
}

function hourHeaderAdd(title) {
  const header = document.createElement("li");

  header.classList.add("hour-period");
  header.textContent = title;

  hours.append(header);
}
