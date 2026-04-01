export const NewTransaction = () => {
  return (
    <div className='bg-white p-4 rounded-lg'>
      <h2>Nova transação</h2>
      <form className='flex flex-col gap-4'>
      <select className="form-select" aria-label="Selecione o tipo de transação">
        <option selected disabled>Selecione o tipo de transação</option>
        <option value="1">Transferência</option>
        <option value="2">Depósito</option>
      </select>

      <div className="input-group mb-3">
        <span className="input-group-text">R$</span>
        <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
      </div>
      <button type="submit" className="btn btn-dark">Concluir transação</button>
      </form>
    </div>
  )
}