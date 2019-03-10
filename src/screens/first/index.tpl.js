export default `<section class="content-form">

<div class="content-form__inner content-image">
  <h1 class="content-form__title">Всего три простых шага для получения бонусов!</h1>
</div>

<div class="content-form__inner content-data">
  <article class="form-area">
    <input data-name="surname" class="custom-input" type="text" placeholder="Фамилия">
    <input data-name="name" class="custom-input" type="text" placeholder="Имя">
    <input data-name="patronymic" class="custom-input" type="text" placeholder="Отчество">
    <div class="radio-section negative-margin_top">
      <input data-name="male" type="radio" checked name="radio-group" id="male" class="radio-form" value="Мужчина">
      <label data-name="male" for="male">Мужчина</label>
      <input data-name="female" type="radio" name="radio-group" id="female" class="radio-form" value="Женщина">
      <label data-name="female" for="female">Женщина</label>
    </div>
    <input data-name="birthday" class="custom-input" type="text" placeholder="Дата рождения">
    <div class="agreement-section negative-margin_top">
      <input data-name="agreement" type="checkbox" name="agreement" id="agreement">
      <label data-name="agreement" for="agreement">Соглашаюсь с условиями участия</label>
    </div>
    <button type="button" class="form-area__button custom-button">
      Продолжить <span class="arrow-button"></span>
    </button>
  </article>
</div>

</section>`;
