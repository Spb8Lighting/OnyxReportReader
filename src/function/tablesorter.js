const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent

const Compare = (idx, asc) => (a, b) => ((v1, v2) =>
  v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
)(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx))

export default Table => {
  Table.querySelectorAll('th').forEach(th => {
    th.addEventListener('click', () => {
      const tbody = th.closest('table').querySelector('tbody')
      Array.from(tbody.querySelectorAll('tr'))
        .sort(Compare(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
        .forEach(tr => tbody.appendChild(tr))
    })
  })
}
