# todo.md

foodPlace -> store (home/shared + crud)
loading gif
delay when using heroku, test it
react propTypes
void(0) => undefined

// Note that IIFE’s like this can cause a performance hit, but in most cases it will not be significant enough to warrant // losing the readability factor.
instead of
  <div id="lib-footer">
    { props.something === defined
      ? ...
      : ...
    }
do this
  <div id="lib-footer">
    {() => {
        if (props.something) {
          return ...
        } else {
          return ...
        }
    }}

// also
{
  isTrue
   ? <p>True!</p>
   : <none/>
}

->

{
  isTrue &&
    <p>True!</p>
}
