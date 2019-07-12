type Props = {
  who: string
} & typeof defaultProps

const defaultProps = {
  greeting: 'Hello',
}

const Greeter: FC<Props> = (props) => (
  <div>
    {props.greeting} {props.who}!
  </div>
)

// 🚨 This won't work. 
// Greeter components API will not mark `greeting` as optional
Greeter.defaultProps = defaultProps

const Test = () => (
  <>
    {/**
      ExpectError ❌
      Property 'greeting' is missing
    */}
    <Greeter who="Martin" />
  </>
)
