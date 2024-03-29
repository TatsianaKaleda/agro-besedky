$(document).ready(function () {
    // Form submit
    $("form").submit(function (event) {
      event.preventDefault();

      if (typeof sessionStorage !== 'undefined') {
          if (sessionStorage.getItem('formSubmitted')) {
              if (!confirm('Вы уже отправили заявку, повторить?')) { return false }
          } else {
              sessionStorage.setItem('formSubmitted', 'true')
          }
      }
      let data = $(this).serializeArray();
      data.push({
          name: "source",
          value: "Test"
      });
      data.push({
          name: "title",
          value: "Test message"
      });
      data.push({
          name: "link",
          value: location.href
      });
      
      // console.log(JSON.stringify(data));
      // return false; // Testing

      $.ajax({
          type: "POST",
          url: "https://skidka-tut.by/action/index.php",
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
          dataType: "json",
          data: data,
      }).done(function (response) {
          // alert(response.text);
          $('#modal-order').modal('hide');
          $('#modal-thanks').modal('show');

          
      }).fail(function (error, textStatus) {
          console.log(error, textStatus);
          alert('Извините, произошла ошибка запроса. Свяжитесь с менеджером по телефону!');
      });

      // Event dispatcher for IE9+ included
      if (typeof (Event) === 'function') {
          document.dispatchEvent(new Event('app.form.send'));
      } else {
          var ev = document.createEvent('Event');
          ev.initEvent('app.form.send', false, false);
          document.dispatchEvent(ev);
      }

      console.log(JSON.stringify(data));
      return false
  });

});