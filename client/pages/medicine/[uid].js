

const medicine = (props) => {
    
  return (
    <div>
    Drug: {props.purchases[0].item.drug.name}<br/>
    Date prescribed: {props.date}<br/>
    Doctor ID: {props.active}<br/>
    <img src={props.image} alt="Prescription image"/>
    </div>
  )
}

export default medicine

export async function getServerSideProps(context){
    try{
        const {params} = context
        const response = await fetch(`https://hackoverflow.herokuapp.com/prescription/${params.id}`)
        const data = await response.json()
        console.log(data)
        return{
            props: data
        }
    } catch (error){
        return {
            props: {}
        }
    }
}