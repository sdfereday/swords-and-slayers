import NodeTypes from '../enums/TreeNodeTypes';

/// Consider adding a 'type' property to avoid confusion
// You can do this in JSON, but that's a future plan right now

/// Following is for reference (remove later):
// {
//     id: "testai",
//     root: new b3.Priority({
//         children: [
//             new BoolCheck('inRangeOfAttack', {
//                 child: new Attack()
//             }),
//             new BoolCheck('inRangeOfTarget', {
//                 child: new Follow()
//             }),
//             new SequenceSynced({
//                 children: [
//                     new Roam(true),
//                     new RandomWait()
//                 ]
//             })
//         ]
//     })
// },

const TreeData = [
    {
        id: "testai",
        root: {
            name: "Priority",
            type: NodeTypes.COMPOSITE,
            children: [
                // {
                //     name: "BoolCheck",
                //     type: NodeTypes.DECORATOR,
                //     param: "inRangeOfAttack",
                //     child: {
                //         name: "Attack",
                //         type: NodeTypes.ACTION,
                //         param: null
                //     }
                // },
                // {
                //     name: "BoolCheck",
                //     type: NodeTypes.DECORATOR,
                //     param: "inRangeOfTarget",
                //     child: {
                //         name: "Follow",
                //         type: NodeTypes.ACTION,
                //         param: null
                //     }
                // },
                {
                    name: "SequenceSynced",
                    type: NodeTypes.COMPOSITE,
                    children: [
                        {
                            name: "Roam",
                            type: NodeTypes.ACTION,
                            param: true
                        },
                        {
                            name: "RandomWait",
                            type: NodeTypes.ACTION,
                            param: null
                        }
                    ]
                }
            ]
        }
    }
];

export default TreeData;