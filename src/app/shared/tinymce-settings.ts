const commonTinymceConfig ={
    height: 300,
      plugins: [
        'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
        'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
        'table emoticons template paste help imagetools'
      ],
      toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' +
        'bullist numlist outdent indent | link image | print preview media fullpage | ' +
        'forecolor backcolor emoticons | help',
      menu: {
        favs: {title: 'My Favorites', items: 'code visualaid | searchreplace | spellchecker | emoticons'}
      },
      menubar: 'favs file edit view insert format tools table help',
    //   content_css: 'css/content.css',
      imagetools_toolbar: "rotateleft rotateright | flipv fliph | editimage imageoptions",
      // images_upload_url: 'http://localhost:51306/Uploads/AboutUS/image/',
}


export {
    commonTinymceConfig
}