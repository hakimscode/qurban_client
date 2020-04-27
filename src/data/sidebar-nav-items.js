export default function() {
  const menus = [
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
    },
    {
      title: "Laporan",
      htmlBefore: '<i class="material-icons">library_books</i>',
      to: "/laporan"
    }
  ];
  return menus;
}
