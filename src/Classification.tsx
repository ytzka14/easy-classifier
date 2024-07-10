export type Classifyee = { // type of object to classify
  link: string; // base64 encoded image in this case
}

export type Class = {
  name: string;
  members: Classifyee[];
}

export type Classification = {
  classes: Class[];
}

export const ClassifyeeComponent = ({classifyee}: {classifyee: Classifyee}) => { // update according to Classifyee type
  return (
    <div>
      <img src={"data:image/jpeg;base64,"+classifyee.link} />
    </div>
  )
}

export const ClassificationComponent = ({classification, leftover}: {classification: Classification, leftover: Classifyee[]}) => {
  return ( 
    <div>
      {classification.classes.map((classItem) => {
        return (
          <div>
            {classItem.name}
            {classItem.members.map((member) => {
              return (
                <ClassifyeeComponent classifyee={member} />
              )
            })}
          </div>
        )
      })}
      <div>
        Unclassifyed (leftover):
        {leftover.map((classifyee) => {
          return (
            <ClassifyeeComponent classifyee={classifyee} />
          )
        })}
      </div>
    </div>
  )
}