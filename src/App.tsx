import { useState } from 'react';
import { Classifyee, Classification, ClassifyeeComponent, ClassificationComponent } from './Classification';

const App = () => {
  const [ clStarted, setClStarted ] = useState(false);
  const [ clFinished, setClFinished ] = useState(false);
  const [ toClassify, setToClassify ] = useState<Classifyee[]>([]);
  const [ classified, setClassified ] = useState<Classification>({classes: []});
  const [ inputValue, setInputValue ] = useState("");

  return (
    <div>
      {(!clStarted && toClassify.length > 0 &&
        <button onClick={() => {setClStarted(true);}}>
          Start Classifying!
        </button>
      )}
      {(clStarted && !clFinished &&
        <div>
          <ClassifyeeComponent classifyee={toClassify[0]} />
          <div className="selections">
            {classified.classes.map((classItem, idx) => {
              return (
                <div onClick={() => {
                  const newClassified = classified;
                  newClassified.classes[idx].members.push(toClassify[0]);
                  setClassified(newClassified);
                  if (toClassify.length === 1) {
                    setClFinished(true);
                  }
                  setToClassify(toClassify.slice(1));
                }}>
                  {classItem.name}
                </div>
              );
            })}
            <div onClick={() => {
              const newClassified = classified;
              newClassified.classes.push({name: inputValue, members: [toClassify[0]]});
              setClassified(newClassified);
              if (toClassify.length === 1) {
                setClFinished(true);
              } 
              setToClassify(toClassify.slice(1));
            }}>
              <input type="text" value={inputValue} onChange={(e) => {setInputValue(e.target.value);}} />
            </div>
          </div>
        </div>
      )}
      {(clFinished &&
        <div>
          <ClassificationComponent classification={classified} />
        </div>
      )}
    </div>
  )
}

export default App;