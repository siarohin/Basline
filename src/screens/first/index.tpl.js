export default `<section class="content-form">

<div class="content-form__inner content-image">
  <h1 class="content-form__title">Всего три простых шага для получения бонусов!</h1>
</div>

<div class="content-form__inner content-data">
  <article class="form-area">
    <form action="#">
      <input class="custom-input" type="text" placeholder="Фамилия">
      <input class="custom-input" type="text" placeholder="Имя">
      <input class="custom-input" type="text" placeholder="Отчество">

      <div class="radio-section negative-margin_top">
        <input type="radio" checked name="radio-group" id="male" class="radio-form">
        <label for="male">Мужчина</label>

        <input type="radio" name="radio-group" id="female" class="radio-form">
        <label for="female">Женщина</label>
      </div>

      <input class="custom-input" type="text" placeholder="Дата рождения">

      <div class="agreement-section negative-margin_top">
        <input type="checkbox" name="agreement" id="agreement" value="">
        <label for="agreement">Соглашаюсь с условиями участия</label>
      </div>

      <button type="button" class="form-area__button custom-button">
        Продолжить <span class="arrow-button"></span>
      </button>
    </form>
  </article>
</div>

</section>`;
