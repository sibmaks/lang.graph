function buildLanguageGraph(data) {
    const nodes = [];
    const edges = [];
    const tips = [];

    for (const [key, value] of Object.entries(data)) {
        let color = '#4CEBFF';
        if (value.type === 'group') {
            color = '#C3FF4C';
        } else if (value.type === 'family') {
            color = '#4CFF74';
        }

        nodes.push({
            data: {
                id: key,
                localization: localizations.get(key),
                color: color
            }
        });

        if (value.parent !== null && value.parent !== undefined) {
            const edgeId = value.parent + "->" + key;
            edges.push({
                data: {
                    id: edgeId,
                    source: value.parent,
                    target: key
                }
            });
        }
        if (value.appeared !== null && value.appeared !== undefined) {
            const appeared = value.appeared;
            if (appeared.type === "IN") {
                const step = appeared.step === "MILLENNIUM" ? " тыс." : " век";
                const era = appeared.era === "BC" ? " до н.э." : " н.э."
                tips.push({
                    id: key,
                    text: appeared.from + "-" + appeared.to + step + era
                });
            } else if (appeared.type === "FROM") {
                if (appeared.from === 0) {
                    tips.push({
                        id: key,
                        text: "с начала н.э."
                    });
                } else {
                    const step = appeared.step === "MILLENNIUM" ? " тыс." : " век";
                    const era = appeared.era === "BC" ? " до н.э." : " н.э."
                    tips.push({
                        id: key,
                        text: appeared.from + step + era
                    });
                }
            }
        }
    }

    const cy = window.cy = cytoscape({
        container: document.getElementById('cy'),

        style: [{
                selector: 'node',
                style: {
                    'content': 'data(localization)',
                    'background-color': 'data(color)',
                    'text-background-color': '#fff',
                    'text-background-shape': 'rectangle',
                    'text-background-opacity': 0.75,
                    'text-halign': 'center',
                    'text-valign': 'bottom',
                    'shape': 'ellipse',
                    'padding': '8px'
                }
            },
            {
                selector: 'edge',
                style: {
                    'curve-style': 'bezier',
                    'target-arrow-color': '#000',
                    'target-arrow-shape': 'triangle-backcurve',
                    'line-color': '#000',
                }
            }
        ],

        elements: {
            nodes: nodes,
            edges: edges
        },

        wheelSensitivity: 0.1,

        layout: {
            name: 'cose-bilkent',
            fit: false,
            padding: 32,
            gravity: 10,
            animate: false,
            randomize: true,
            nodeDimensionsIncludeLabels: true
        }
    });

    localizations.addListener(function () {
        cy.nodes().css('content', function(n) { return localizations.get(n.data().id); });
    });

	const tippies = {};

    for (let i in tips) {
        const tip = tips[i];
        const element = cy.getElementById(tip.id);
		tippies[element.id()] = makeTippy(element, tip.text);
    }

	cy.nodes().on('click', function(e){
		const element = e.target;
		const tippy = tippies[element.id()];
		if(tippy !== null && tippy !== undefined) {
			if(tippy.state.isShown) {
				tippy.hide();
			} else {
				tippy.show();
			}
		}
	});
}