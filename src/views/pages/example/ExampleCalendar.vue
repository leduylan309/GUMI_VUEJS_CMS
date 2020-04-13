<template>
  <div class="content-wrapper">
    <div class="content-section introduction">
      <div class="feature-intro">
        <h1>Calendar</h1>
        <p>Calendar is an input component to select a date.</p>
      </div>
    </div>
    <div class="content-section implementation">
      <div class="p-grid p-fluid">
        <div class="p-col-12 p-md-4">
          <h3>Basic</h3>
          <Calendar v-model="date1"/>
        </div>
        <div class="p-col-12 p-md-4">
          <h3>Disable Days</h3>
          <Calendar v-model="date5" :disabledDates="invalidDates" :disabledDays="[0,6]" :manualInput="false"/>
        </div>
        <div class="p-col-12 p-md-4">
          <h3>Navigators</h3>
          <Calendar v-model="date6" :monthNavigator="true" :yearNavigator="true" yearRange="2000:2030"/>
        </div>
        <div class="p-col-12 p-md-4">
          <h3>Multiple</h3>
          <Calendar v-model="dates1" selectionMode="multiple" :manualInput="false"/>
        </div>
        <div class="p-col-12 p-md-4">
          <h3>Range</h3>
          <Calendar v-model="dates2" selectionMode="range" :manualInput="false"/>
        </div>
        <div class="p-col-12 p-md-4">
          <h3>Button Bar</h3>
          <Calendar v-model="date7" :showButtonBar="true"/>
        </div>
        <div class="p-col-12 p-md-4">
          <h3>Time / 24h</h3>
          <Calendar v-model="date8" :showTime="true" :showSeconds="true"/>
        </div>
        <div class="p-col-12 p-md-4">
          <h3>Date Template</h3>
          <Calendar v-model="date12">
            <template #date="slotProps">
              <div v-if="slotProps.date.day > 10 && slotProps.date.day < 15" class="special-day">
                {{slotProps.date.day}}
              </div>
              <span v-else>{{slotProps.date.day}}</span>
            </template>
          </Calendar>
        </div>
      </div>

      <h3>Inline</h3>
      <Calendar v-model="date14" :inline="true" :showWeek="true"/>
    </div>
  </div>
</template>

<script>
  import Calendar from 'primevue/calendar';

  export default {
    name: "ExampleCalendar",
    components: {
      Calendar
    },
    created() {
      let today = new Date();
      let month = today.getMonth();
      let year = today.getFullYear();
      let prevMonth = (month === 0) ? 11 : month - 1;
      let prevYear = (prevMonth === 11) ? year - 1 : year;
      let nextMonth = (month === 11) ? 0 : month + 1;
      let nextYear = (nextMonth === 0) ? year + 1 : year;
      this.minDate = new Date();
      this.minDate.setMonth(prevMonth);
      this.minDate.setFullYear(prevYear);
      this.maxDate = new Date();
      this.maxDate.setMonth(nextMonth);
      this.maxDate.setFullYear(nextYear);

      let invalidDate = new Date();
      invalidDate.setDate(today.getDate() - 1);
      this.invalidDates = [today, invalidDate];
    },
    data() {
      return {
        date1: null,
        date2: null,
        date3: null,
        date4: null,
        date5: null,
        date6: null,
        date7: null,
        date8: null,
        date9: null,
        date10: null,
        date11: null,
        date12: null,
        date13: null,
        date14: null,
        dates1: null,
        dates2: null,
        es: {
          firstDayOfWeek: 1,
          dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
          dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
          dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
          monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
          monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
          today: 'Hoy',
          clear: 'Borrar',
          weekHeader: 'Sm'
        },
        minDate: null,
        maxDate: null,
        invalidDates: null
      }
    }
  }
</script>

<style scoped lang="scss">
  .p-grid {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -.5em;
    margin-left: -.5em;
    margin-top: -.5em;
  }

  .p-md-4 {
    @media screen and (min-width: 768px) {
      width: 33.3333%;
    }
  }
</style>
