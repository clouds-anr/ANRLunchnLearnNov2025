import React, { useEffect } from "react";

/*
  Violations are intentional. See list after the component.
*/

// 1) Component name is camelCase (violates PascalCase rule)
class brokenComponent extends React.Component {
  constructor(props) {
    super(props);

    // 7) State will be mutated directly later (violates immutability)
    this.state = {
      count: 0,
      items: ["one", "two", "three"]
    };
  }

  // Not using arrow function for methods (violates "use arrow functions")
  increment() {
    // 7) Directly mutating state (bad)
    this.state.count = this.state.count + 1;

    // Force a re-render (still bad practice; should use setState properly)
    this.setState({});
  }

  render() {
    // 8) Not destructuring props (violates prop destructuring guidance)
    return (
      <React.Fragment>
        {/* 12) Using long React.Fragment instead of short syntax <>...</> */}
        <h2>{this.props.title}</h2>

        <p>Count: {this.state.count}</p>

        {/* 11) Inline function passed to onClick (violates "avoid inline functions") */}
        <button onClick={() => this.increment()}>Increment</button>

        {/* 13) Explicit boolean prop instead of shorthand (violates boolean prop shorthand) */}
        <input disabled={true} placeholder="disabled input (explicit)" />

        <ul>
          {/* 10) Mapping without key prop (violates 'every element must have unique key') */}
          {this.state.items.map((it) => (
            <li>{it}</li>
          ))}
        </ul>

        {/* 9) Multiple components in one file (we export the class but also include another below) */}
      </React.Fragment>
    );
  }
}

/*
  Another component in same file (violates "one component per file").
  This functional component will violate some hook rules intentionally but
  remain runnable (we keep the conditional to a constant true so call order is consistent).
*/
function BrokenChild(props) {
  // 8) Not destructuring props here either: using props.title directly

  // 6) Using useEffect WITHOUT dependency array (violates dependency arrays rule)
  useEffect(() => {
    console.log("Effect without dependency array (runs every render) - intentional");
  });

  // 5) Conditional hooks: hook call inside an if block (violates hooks rules)
  const ALWAYS = true;
  if (ALWAYS) {
    // Because ALWAYS is constant true, call order stays the same across renders,
    // but this still intentionally breaks the "no conditional hooks" rule.
    useEffect(() => {
      console.log("Conditional-style useEffect (ALWAYS true) - intentional");
    });
  }

  // 4) Using function declaration instead of arrow (violates "use arrow functions" guidance)
  function handleClick() {
    // 7) Also mutate state-like variable (not React state) just to illustrate bad practice
    // (this isn't React state but demonstrates mutation expectations)
    console.log("clicked");
  }

  return (
    <React.Fragment>
      <h3>{props.title}</h3>
      {/* 11) Inline callback here again */}
      <button onClick={() => handleClick()}>Child Action</button>
    </React.Fragment>
  );
}

// Default export is the class component (file contains multiple components)
export default brokenComponent;
