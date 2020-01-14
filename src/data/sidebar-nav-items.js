export default function() {
  return [
    {
      title: "Dashboard",
      to: "/dashboard",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Kelurahan",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/kelurahan"
    },
    {
      title: "Penerima Qurban",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/penerima-qurban"
    },
    {
      title: "Pemberi Qurban",
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: "/pemberi-qurban"
    }
  ];
}
