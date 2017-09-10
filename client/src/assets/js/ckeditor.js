// jQuery(document).ready(function () {
// 	//editorConfig(CKEDITOR.config);
//   editorConfig(CKEDITOR.config);
//
//   // Add class for table create by ckeditor
//   CKEDITOR.on('dialogDefinition', function (ev) {
//     var dialogName = ev.data.name;
//     var dialogDefinition = ev.data.definition;
//
//     if (dialogName === 'table') {
//       var addCssClass = dialogDefinition.getContents('advanced').get('advCSSClasses');
//       addCssClass['default'] = 'table table-bordered';
//     }
//   });
//
// });
//
// function editorConfig ( config ) {
//   config.toolbar_Basic = [
//     { name: 'source', items: [ 'Templates'] },
//     { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', 'Undo', 'Repo'] },
//     { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat' ] },
//     { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
//     { name: 'link', items: [ 'Link', 'Unlink' ] },
//     { name: 'insert', items: [ 'Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar'] },
//     { name: 'styles', items: [ 'Format' ] },
//     { name: 'colors', items: [ 'TextColor', 'BGColor'] }
//   ];
//   //remove style when copy content
//   config.forcePasteAsPlainText = true;
// };
