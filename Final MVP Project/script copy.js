// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Course prerequisites data
const prerequisites = {
    'DCS 105': { requires: 'NONE' },
    'DCS 106': { requires: 'NONE' },
    'DCS 109D': { requires: 'NONE' },
    'DCS 109R': { requires: 'NONE' },
    'DCS 109S': { requires: 'NONE' },
    'DCS 109T': { requires: 'NONE' },
    'DCS 117': { requires: 'NONE' },
    'DCS 170': { requires: 'NONE' },
    'DCS 204': { requires: 'DCS1XX', description: 'One 100 level DCS course' },
    'DCS 206': { requires: 'NONE' },
    'DCS 209': { requires: 'NONE' },
    'DCS 210': { requires: 'ANY_DCS', description: 'One other DCS course' },
    'DCS 211': { requires: 'OR', courses: ['DCS 109', 'DCS 111', 'DCS 210'] },
    'DCS 212': { requires: 'NONE' },
    'DCS 216': { requires: 'AND', courses: ['MATH 106', ['PHYS 108', 'PHYS S31']] },
    'DCS 219': { requires: 'NONE' },
    'DCS 229': { requires: 'OR', courses: ['DCS 109D', 'DCS 109R', 'DCS 109S', 'DCS 109T', 'DCS 111'] },
    'DCS 252': { requires: 'OR', courses: ['PHIL', 'PSYC', 'NRSC'], description: 'One PHIL or One PSYC or One NRSC' },
    'DCS 301C': { requires: 'NONE' },
    'DCS 305': { requires: 'DCS2XX', description: 'One 200 level DCS course' },
    'DCS 306': { requires: 'AND', courses: [['NRSC 160', 'NRSC 200', 'PSYC 160', 'PSYC 200'], ['PSYC 222', 'PSYC 230', 'PSYC 250']] },
    'DCS 307': { requires: 'OR', courses: ['DCS 211', 'DCS 229'] },
    'DCS 316': { requires: 'AND', courses: ['MATH 205', 'MATH 206'] },
    'DCS 317': { requires: 'DCS 229' },
    'DCS 319': { requires: 'NONE' },
    'DCS 320': { requires: 'AND', courses: [['DCS 109R', 'DCS 109T', 'DCS 109S', 'DCS 109D', 'DCS 111'], ['DCS 211', 'DCS 229', 'BIO 202']] },
    'DCS 325': { requires: 'OR', courses: ['DCS 109R', 'DCS 109T', 'DCS 109S', 'DCS 109D', 'DCS 111'] },
    'DCS 331': { requires: 'MATH 205' },
    'DCS 351': { requires: 'AND', courses: ['ECON 255', 'ECON 270'] },
    'DCS 355A': { requires: 'AND', courses: ['MATH 106', 'MATH 205'] },
    'DCS 355D': { requires: 'MATH 205' },
    'DCS 355H': { requires: 'MATH 205' },
    'DCS 357': { requires: 'OR', courses: ['NRSC 160', 'PSYC 160'] },
    'DCS 360': { requires: 'NONE' },
    'DCS 368': { requires: 'AND', courses: ['ECON 255', ['ECON 260', 'ECON 270']] },
    'DCS 375': { requires: 'DCS 204' },
    // Short term courses with updated prerequisites
    'DCS S13': { requires: 'AND', courses: ['MATH', ['DCS 109T', 'DCS 109R', 'DCS 109S', 'DCS 109D', 'DCS 111']], description: 'One MATH and (DCS 109T or DCS 109R or DCS 109S or DCS 109D or DCS 111)' },
    'DCS S16': { requires: 'NONE' },
    'DCS S17': { requires: 'NONE' },
    'DCS S31': { requires: 'ANY_DCS', description: 'One DCS course' },
    'DCS S33': { requires: 'OR', courses: ['DCS 109R', 'DCS 109T', 'DCS 109S', 'DCS 109D', 'DCS 111'], description: 'DCS 109R or DCS 109T or DCS 109S or DCS109D or DCS 111' },
    'DCS S34': { requires: 'OR', courses: ['MATH 117', 'DCS 204', 'DCS 210', 'DCS 211', 'DCS 375'], description: 'MATH 117 or DCS 204 or DCS 210 or DCS 211 or DCS 375' },
    'DCS S45T': { requires: 'OR', courses: ['MATH 205', 'MATH 206'], description: 'MATH 205 or MATH 206' },
    'DCS S51A': { requires: 'OR', courses: ['AMST 204', 'DCS 104', 'DCS 204'], description: 'AMST 204 or DCS 104 or DCS 204' },
    // Capstone course (placeholder prerequisite)
    'Capstone': { requires: 'NONE' }
};

// Course descriptions (placeholders for now)
const courseDescriptions = {
    'DCS 105': 'Our world is rife with misinformation. This course is designed to hone digital citizenship skills. It is about "calling bullshit": spotting, dissecting, and publicly refuting false claims and inferences based on quantitative, statistical, and computational analysis of data. Students explore case studies in policy and science and dissect the "who, what, where, when, why, and how" of bullshit propagation. Examples include election misinformation, interpreting health risk, facial recognition algorithms, and science communication. Students practice visualizing data; interpreting scientific claims; and spotting misinformation, fake news, causal fallacies, and statistical traps. In doing so, the course offers an introduction to programming with R for data analysis and visualization.',
    'DCS 106': 'Two premises inform this course: technologies have histories and cultures; technologies are gendered. The course brings together the disciplinary approaches of science and technology studies and gender and sexuality studies to explore contemporary problems at the intersection of gender and technology. Students explore classic texts in these fields and undertake design processes that help them apply those texts to real-world problems.',
    'DCS 109D': 'This course is an introduction to computational thinking and problem solving via programming, designed for students interested in addressing problems in brain research, as well as experimental science more broadly. Students learn fundamentals of computer programming using Python, including basic data structures, flow control structures, functions, recursion, elementary object-oriented programming, and file I/O, as well as discussion of higher-level concepts including abstraction, modularity, reuse, testing, and debugging. By implementing programs in contexts such as image processing, neural networks, and the analysis of electrical brain activity, students develop an understanding of computational problem solving and gain experience in broadly applicable software development for data analysis.',
    'DCS 109R': 'This course introduces computer science, computational thinking, and problem-solving in the context of robots. Students learn about computing in terms of the representation and manipulation of data, fundamental algorithms, and societal implications of computing. They will learn the fundamentals of computer programming using Python, including conditional statements, iteration, abstraction, testing, modularity, and debugging. Students will gain an understanding of computational problem solving through implementing programs to control robots and solve robotics problems.',
    'DCS 109S': 'This course is an introduction to computational thinking and problem solving via an introduction to computer programming, designed for students interested in broadly applying computing and software solutions across a range of disciplines. It considers computing as a discipline of study, exploring the representation and manipulation of data, fundamental algorithms, efficiency, and limits of computing. Students learn fundamentals of computer programming using Python, including basic data structures, flow control structures, functions, recursion, elementary object-oriented programming, and file I/O, as well as discussion of higher-level concepts including abstraction, modularity, reuse, testing, and debugging. By implementing programs in contexts such as image processing, voting algorithms, DNA sequence analysis, and simple games, students develop an understanding of computational problem solving and gain experience in broadly applicable software development skills.',
    'DCS 109T': 'This course is an introduction to computational thinking and problem solving via programming, designed for students interested in applying computation to the humanities and text analysis. It frames computation as a process of designing systematic solutions to problems; implementing, testing, and verifying those solutions; and making the solutions accessible to other scholars and investigators. Students learn fundamentals of computer programming using Python, including basic data structures, flow control structures, functions, recursion and elementary object-oriented programming, as well as discussion of higher-level concepts including abstraction, modularity, reuse, testing, and debugging. By the end of the semester, students develop an understanding of computational problem solving and gain experience implementing that problem solving in the context of text analysis.',
    'DCS 117': 'This course offers an introduction to data science through data visualization. Through hands-on assignments, students will develop their skills in data cleaning, analysis, and visualization using the R programming language and Github for version control. In the course students will learn to calculate and describe data using descriptive statistics and how to create a range of data visualizations to explore variation and covariation in data. Students will also learn to critique and reflect on data visualizations encountered in everyday life. No prior experience in data science or programming is necessary, making this course accessible to all students interested in exploring the dynamic field of data science.',
    'DCS 170': 'This introductory course explores the ever-evolving world of digital media in the performing arts, where technology, creativity, and communities converge. Students will be trained on the holistic and collaborative process from storyboarding to technical execution, specifically as it relates to live entertainment. We\'ll examine the history, current landscape, and emerging technologies in projection and video design.',
    'DCS 204': 'The computational humanities comprise a fast-growing and exciting field that is changing the way scholars work and think. This course provides an opportunity for students with some experience with programming to immerse themselves in semester-long projects in digital environments, moving from "analog" archives, through data structuring, and quantitative analysis, and culminating with a project that makes both the humanities and quantitative analyses legible for people from diverse backgrounds.',
    'DCS 206': 'In this course students examine the history, present, and possible future of computing through film and literature, focusing on questions at the intersection of computing, digital studies, and communication: Who are the stakeholders and participants in this intersectional area? What are the uses and abuses of data and computing in society? Who has the power of technology and who does not, and what are the consequences of that power?',
    'DCS 209': 'This course considers the politics of race, gender, and sexuality as they emerge in video games and their surrounding ecosystems: in games and their conditions and processes of production, in the representations and spaces of identification that come with the play of games, in the communities that players generate among themselves, and in the affective and material interactions that result when players look at a screen, hold a controller, type on a keyboard, and move a mouse.',
    'DCS 210': 'This course teaches computer programming with a focus on quantitative data analysis and visualization. Primarily using the R programming language, fundamental programming concepts and high-level tools for data manipulation, analysis, and visualization are introduced using a variety of projects with cross-disciplinary applicability. In addition to writing computer scripts to analyze data, students learn the concepts and methods for effective presentation of data in a reproducible way.',
    'DCS 211': 'Building on DCS 109 (Introduction to Computing and Programming), this course explores practical application of software composition as a bridge to other disciplines. Students continue to develop programming and problem-solving skills, with the clear purpose of providing insight to inquiry in other fields that is made possible by modern computing, software composition, and libraries. The course includes study of additional data structures and algorithms; data harvesting, analysis, and visualization; machine learning; modeling and simulation; and considerations of human- and machine-efficiency. As a final course project, students design, implement, and assess a computing project of their choosing.',
    'DCS 212': 'Through a combination of analytical, experiential, and collaborative exercises, students merge traditional historical methods with digital tools to explore new useful methodologies for collecting, analyzing, and disseminating historical knowledge. They develop technical and theoretical proficiency within the broader field of digital humanities. They engage digital tools and resources to rethink old historical questions. They develop with new questions that can be investigated only through digital practice. They contemplate avenues for collaboration between historical research and public communities. Finally, they weigh the practical and theoretical implications of using digital history to create more inclusive scholarship.',
    'DCS 216': 'An introduction to computational methods for simulating physical systems, this course focuses on the numerical analysis and algorithmic implementation necessary for efficient solution of integrals, derivatives, linear systems, differential equations, and optimization. While the course presents a rigorous introduction to the numerical analysis underlying these techniques, the emphasis remains on practical solutions to important physical problems. Students solve problems across the wide range of applications of computational physics including astrophysics, biological population dynamics, gravitational wave detection, urban traffic flow, and materials science.',
    'DCS 219': 'This course takes computational and communications systems concepts, such as randomness, probability, generativity, signal processing, feedback, control (and non-control), and listening as parameters for electronic sound composition. Using the free, user-friendly visual programming environment, Pure Data (Pd), students create unique software-based artworks and compositions. Creative projects are grounded in theoretical and historical readings as well as listening assignments that provide context for the application of computational concepts and communications systems thinking to sonic arts practice. The course culminates in a final showing of sound art installations and performances.',
    'DCS 229': 'This course provides an introduction to common data structures and selected algorithms for solving more complex problems. Topics covered include concrete data types (arrays and linked structures); abstract data types (including stacks, queues, trees, and maps); an introduction to fundamental algorithms including sorting, graph-search algorithms (breadth-first search, depth-first search), and greedy algorithms; and basic algorithm analysis (big-Oh). The course focuses on applying data structures and algorithms for problem solving, rather than on data-structure implementation details and formal analysis.',
    'DCS 252': 'Cognitive science is the interdisciplinary study of the mind, including psychology, neuroscience, linguistics, computer science, and philosophy as its core. This course examines the conceptual foundations of cognitive science, and different approaches to integrating findings and perspectives from across disciplines into a coherent understanding of the mind. Students also consider issues in the philosophy of science, the nature of mind, self, agency, and implicit bias.',
    'DCS 301C': 'Public history takes place beyond history classrooms and academic contexts. Traditionally, it has been found in museums, walking tours, and performances, and has told the stories of people with social and political privilege. Increasingly, however, public history has come to focus on a greater range of voices, and takes place in a wider range of forms: on websites, graphic novels, interactive sensory experiences, social media, and other digital spaces. In this community-engaged course, students learn to see public history "in the wild," engage with primary sources, and present those sources and historical interpretation to the public in digital form. Students with interests in history and public engagement are encouraged to enroll in this course.',
    'DCS 305': 'Space and place-visualized by maps-condition nearly every aspect of our lived experience. It is almost impossible to imagine everyday experiences without access to maps. Maps also encode power. They tell particular stories and represent dominant cultural understandings of spatial relationship. In this course, students consider the reasons for studying maps, the ways in which maps might inscribe or combat extant power structures, the tools needed for geospatial analysis, how to embed and analyze geographical information, and how to link historical maps to modern-day geographies.',
    'DCS 306': 'The course examines historical and recent trends in animal learning. Topics include classical and operant conditioning, biological constraints on learning, and cognitive processes.',
    'DCS 307': 'This course introduces topics in computer simulation, focusing on the underlying theory, implementation, and analysis of discrete-event simulation models. Topics include discrete-event simulation, Monte Carlo simulation, random number generation, discrete and continuous stochastic models, input modeling, statistics and visualization for output analysis, and point and interval parameter estimation in simulation contexts. The course focuses heavily on real-world systems that are appropriately modeled using queuing and agent-based simulation models. The course is simultaneously theoretical and computational. Students use mathematical and statistical derivations, as well as existing software libraries in R and Python, to understand and analyze simulation models. Software development is also a significant component of the course, as students work in teams to design, implement, and analyze the results of their own models.',
    'DCS 316': 'This PIC Math (Preparation for Industrial Careers in Mathematical Sciences) course is intended for students with a strong interest in industrial applications of mathematics and computation. Students work in teams on a research problem identified by a community partner from business, industry, or government. Students develop their mathematical and programming skills as well as skills and traits valued by employers of STEM professionals, such as teamwork, effective communication, independent thinking, problem solving, and final products.',
    'DCS 317': 'This course presents an introduction to the design and analysis of efficient algorithms, and to the theory of computation. Students will learn to apply and analyze standard problem-solving techniques, and will also examine the spaces of problems that can be solved versus those that cannot be solved. Topics in algorithms will cover design strategies including divide & conquer and dynamic programming, as well as tools for analyzing and conveying algorithmic performance and correctness. The course will also include topics from the theory of computation, including P vs NP and regular expressions, deterministic finite automata, Turing machines, undecidability, and the halting problem.',
    'DCS 319': 'This seminar will explore privilege, power, place, and concepts of labor within digital economies of communication and information exchange. As digital technologies continue to blur the boundaries between leisure and work, surveillance and data collection become invisibilized and normalized processes. This class will combine methodologies from feminist research practices and critical digital studies while exploring the rapid coevolution of labor and technology. We will discuss place and transnational technological labor, unpack the black box of artificial intelligence and machine learning, and explore the digital spaces for activism towards an open and inclusive science. Students in this course will gain critical thinking and analytical skills in an interdisciplinary classroom setting that incorporates scholarship and methodologies from both humanities and STEM disciplines.',
    'DCS 320': 'Provides a comprehensive overview of health informatics, examining how digital health technologies and data-driven solutions are transforming healthcare. Includes study of design, implementation, and interoperability of health information systems, including electronic health records (EHRs) and clinical decision support systems (CDSS), and data standards. Students will learn to acquire, preprocess, and analyze health data using machine learning and predictive modeling techniques to enhance healthcare outcomes. Students will explore digital health innovations such as telemedicine, wearable devices, and mobile health applications. Students will critically analyze ethical, societal, and regulatory challenges, particularly in patient data privacy, security, and bias in artificial intelligence. Students will also develop and evaluate innovative digital health solutions to address current and future healthcare challenges through practical, project-based learning using real-world datasets.',
    'DCS 325': 'This course provides an introduction to full-stack web development, including user-facing website design and construction, back-end frameworks, and client communication. The course will cover fundamental core web technologies (HTML, CSS, and JavaScript), as well as select libraries and frameworks used in current practice (e.g., React, Tailwind CSS). The course will also cover various web data formats (e.g., JSON, XML), server-side / back-end frameworks (e.g., Firebase, Django, Flask), fundamental UI and UX concepts (e.g., prototyping, usability, accessibility), and website security. Students will work directly with clients, with a focus on planning and maintenance.',
    'DCS 331': 'This course begins with linear regression models and introduces students to a variety of techniques for learning from data, as well as principled methods for assessing and comparing models. Topics include bias-variance trade-off, resampling and cross-validation, linear model selection and regularization, classification and regression trees, bagging, boosting, random forests, support vector machines, generalized additive models, principal component analysis, unsupervised learning and k-means clustering. Emphasis is placed on the mathematics behind these concepts and on the statistical computing in a high-level language (e.g. R or Python).',
    'DCS 351': 'This course is an introduction to dynamic general equilibrium models, which have become the workhorses of modern macroeconomics. These models involve intertemporal optimization by the different agents in the economy: households, firms, and the government. They are often used to analyze the modern theories of growth and aggregate fluctuations, and to study the role of monetary and fiscal policy. Most of these dynamic models, however, do not have analytical (closed form) solutions and one often has to rely on computational methods to analyze their behavior. The goal of this course is to provide an introduction to the computational tools that are necessary to solve dynamic economic models quantitatively.',
    'DCS 355A': 'This course studies the best ways to perform calculations that have already been developed in other mathematics courses. For instance, if a computer is to be used to approximate the value of an integral, one must understand both how quickly an algorithm can produce a result and how trustworthy that result is. While students implement algorithms on computers, the focus of the course is the mathematics behind the algorithms. Topics may include interpolation techniques, approximation of functions, solving equations, differentiation and integration, solution of differential equations, iterative solutions of linear systems, and eigenvalues and eigenvectors.',
    'DCS 355D': 'The field of dynamical systems is best understood from both theoretical and computational viewpoints, as each informs the other. Students explore attracting and repelling cycles and witness the complicated dynamics and chaos a simple function can exhibit. Topics include chaos in discrete versus continuous dynamical systems, bifurcations, and attractors, with applications to biology and physics. While there will be a significant computational component to the course, previous coding experience is not required.',
    'DCS 355H': 'This course studies the best ways to perform calculations that have been developed in Linear Algebra. Topics may include solving systems of equations, error and condition numbers, least squares, and eigenvalues and singular values.',
    'DCS 357': 'The brain is a complex object, and studying it scientifically requires a facility with tools and concepts for analyzing high dimensional data. This course will provide a survey of such tools through representative case studies in perception (how many types of odors are there?), genomics (how do we classify cell types?), and neural coding and dynamics (how does brain activity encode attributes of the world?). Students will develop intuitions for framing fundamental neuroscience questions as data-driven problems, and will also develop skills for exploring, visualizing, modeling, and interpreting data. No prior experience with coding is assumed or expected, and the course will emphasize the use of high-level computational tools rather than implementation of algorithms from scratch.',
    'DCS 360': 'Students, in consultation with a faculty advisor, individually design and plan a course of study or research not offered in the curriculum. Course work includes a reflective component, evaluation, and completion of an agreed-upon product. Sponsorship by a faculty member in the program/department, a course prospectus, and permission of the chair are required. Students may register for no more than one independent study per semester.',
    'DCS 368': 'Economics is at the forefront of developing statistical methods for analyzing data collected from uncontrolled sources. Because econometrics addresses challenges such as sample selection bias and treatment effects identification, the discipline is well-suited to analyze large or unstructured datasets. This course introduces practical tools and econometric techniques to conduct empirical analysis on topics like equality of opportunity, education, racial disparities, and more. These skills include data acquisition, project management, version control, data visualization, efficient programming, and tools for big data analysis. The course also explores how econometrics and statistical learning methods cross-fertilize and can be used to advance knowledge on topics where large volumes of data are rapidly accumulating. We will also cover the ethics of data collection and analysis.',
    'DCS 375': 'Networks are everywhere. They describe how people, organisms, and ideas connect and interact. Studying networks reveals patterns, systems, and frameworks that are, in many cases, otherwise invisible. This course introduces network analysis as a tool that offers insights into the construction of social, biological, and information systems. It scaffolds the terminology and theoretical underpinnings of network science. It also introduces the data wrangling, qualitative analysis, quantitative analysis, critical analysis, and data visualization tools that often accompany the studies of networks. Recommended background: Prior coursework in critical digital studies and R programming, data cleaning, and/or significant programming experience.',
    'DCS S13': 'This course will explore art and how art can be used to visually demonstrate computational and mathematical concepts. Explore the cross-over between two very different disciplines and what you can do with this knowledge. This course will feature work by prominent mathematicians and computer scientists in the mathematical and computational art space. Additionally, students will leave the course with a completed art project of their devising that demonstrates a computational or mathematical concept and a beginner level knowledge of crochet. The course will also include a historical overview of how art, specifically weaving and knitting, were instrumental in creating examples of how to store information that would be used as computer science was developed.',
    'DCS S16': 'This is a placeholder description for DCS S16. The actual course description will be provided later.',
    'DCS S17': 'This is a placeholder description for DCS S17. The actual course description will be provided later.',
    'DCS S31': 'This is a placeholder description for DCS S31. The actual course description will be provided later.',
    'DCS S33': 'This is a placeholder description for DCS S33. The actual course description will be provided later.',
    'DCS S34': 'This is a placeholder description for DCS S34. The actual course description will be provided later.',
    'DCS S45T': 'This is a placeholder description for DCS S45T. The actual course description will be provided later.',
    'DCS S51A': 'This is a placeholder description for DCS S51A. The actual course description will be provided later.',
    'Capstone': 'This is a placeholder description for the Capstone course. The actual course description will be provided later.'
};

// Define major requirements based on the provided image
const majorRequirements = {
    csMethod1: {
        name: "Introduction to Programming",
        options: ['DCS 109D', 'DCS 109R', 'DCS 109S', 'DCS 109T', 'DCS 109', 'DCS 111']
    },
    csMethod2: {
        name: "Software Development",
        options: ['DCS 211', 'DCS 229']
    },
    coreMethod1: {
        name: "Data Science & Analysis",
        options: ['DCS 105', 'DCS 204', 'DCS 212', 'DCS 307', 'DCS 375']
    },
    coreMethod2: {
        name: "Critical Digital Studies",
        options: ['DCS 105', 'DCS 106', 'DCS 204', 'DCS 206', 'DCS 212', 'DCS 301C', 'DCS 305']
    },
    coreMethod3: {
        name: "Human-Centered Design",
        options: ['DCS 106', 'DCS 301C', 'DCS 304', 'DCS 305', 'DCS 325', 'DCS S31']
    },
    coreMethod4: {
        name: "Community-Engaged Learning",
        options: ['DCS 106', 'DCS 212', 'DCS 301C', 'DCS 304', 'DCS 325']
    },
    electives300: {
        name: "Two 300-level DCS Electives",
        check: course => course.match(/^DCS 3\d\d$/) !== null
    },
    capstone: {
        name: "Senior Design Capstone",
        options: ['Capstone'],
        check: course => course === 'Capstone' || course.match(/^DCS 4\d\d$/) !== null
    },
    shortTerm: {
        name: "Short Term Courses",
        check: course => course.match(/^DCS S\d+/) !== null,
        max: 2
    }
};

// Initialize drag and drop functionality
document.addEventListener('DOMContentLoaded', () => {
    const courseButtons = document.querySelectorAll('.course-btn');
    const courseSlots = document.querySelectorAll('.course-slot');

    // Create a course description popup element
    const dragDescriptionPopup = document.createElement('div');
    dragDescriptionPopup.id = 'drag-description-popup';
    dragDescriptionPopup.className = 'drag-description-popup';
    dragDescriptionPopup.innerHTML = `
        <div class="popup-title"></div>
        <div class="popup-body"></div>
    `;
    document.body.appendChild(dragDescriptionPopup);

    // Store original positions of all buttons
    const buttonPositions = new Map();
    courseButtons.forEach((button, index) => {
        const isDCSCourse = button.textContent.startsWith('DCS') || button.textContent === 'Capstone';
        buttonPositions.set(button.textContent, {
            list: isDCSCourse ? 'left' : 'right',
            index: index
        });
    });

    // Function to check if prerequisites are met for a specific course and slot
    function checkPrerequisites(course, targetSlot) {
        if (!prerequisites[course]) return true; // No prerequisites needed
        const prereq = prerequisites[course];
        
        // If no prerequisites required
        if (prereq.requires === 'NONE') return true;

        // Get all previous semester slots
        const semesterContainer = targetSlot.closest('.semester');
        const allSemesters = Array.from(document.querySelectorAll('.semester'));
        const targetSemesterIndex = allSemesters.indexOf(semesterContainer);
        const previousCourses = [];

        // Collect all courses from previous semesters
        for (let i = 0; i < targetSemesterIndex; i++) {
            const semesterSlots = allSemesters[i].querySelectorAll('.course-slot');
            semesterSlots.forEach(slot => {
                const courseBtn = slot.querySelector('.course-btn');
                if (courseBtn) previousCourses.push(courseBtn.textContent);
            });
        }

        // Check different types of prerequisites
        switch (prereq.requires) {
            case 'DCS1XX':
                return previousCourses.some(c => c.match(/DCS\s1\d\d/));
            
            case 'DCS2XX':
                return previousCourses.some(c => c.match(/DCS\s2\d\d/));
                
            case 'ANY_DCS':
                return previousCourses.some(c => c.startsWith('DCS'));
                
            case 'OR':
                return prereq.courses.some(c => {
                    if (Array.isArray(c)) {
                        return c.some(subC => previousCourses.includes(subC));
                    }
                    return previousCourses.some(pc => pc.startsWith(c));
                });
                
            case 'AND':
                return prereq.courses.every(c => {
                    if (Array.isArray(c)) {
                        return c.some(subC => previousCourses.includes(subC));
                    }
                    return previousCourses.includes(c);
                });
                
            default:
                return previousCourses.includes(prereq.requires);
        }
    }

    // Function to get missing prerequisites for a course
    function getMissingPrerequisites(course, previousCourses) {
        if (!prerequisites[course] || prerequisites[course].requires === 'NONE') return [];
        const prereq = prerequisites[course];
        const missing = [];

        switch (prereq.requires) {
            case 'DCS1XX':
                if (!previousCourses.some(c => c.match(/DCS\s1\d\d/))) {
                    missing.push('Any DCS 100-level course');
                }
                break;
            
            case 'DCS2XX':
                if (!previousCourses.some(c => c.match(/DCS\s2\d\d/))) {
                    missing.push('Any DCS 200-level course');
                }
                break;
                
            case 'ANY_DCS':
                if (!previousCourses.some(c => c.startsWith('DCS'))) {
                    missing.push('Any DCS course');
                }
                break;
                
            case 'OR':
                const hasOr = prereq.courses.some(c => {
                    if (Array.isArray(c)) {
                        return c.some(subC => previousCourses.includes(subC));
                    }
                    return previousCourses.some(pc => pc.startsWith(c));
                });
                if (!hasOr) {
                    missing.push(prereq.courses.flat().join(' or '));
                }
                break;
                
            case 'AND':
                prereq.courses.forEach(c => {
                    if (Array.isArray(c)) {
                        if (!c.some(subC => previousCourses.includes(subC))) {
                            missing.push(c.join(' or '));
                        }
                    } else if (!previousCourses.includes(c)) {
                        missing.push(c);
                    }
                });
                break;
                
            default:
                if (!previousCourses.includes(prereq.requires)) {
                    missing.push(prereq.requires);
                }
        }
        return missing;
    }

    // Function to create a course button element
    function createCourseButton(courseName) {
        const button = document.createElement('button');
        button.className = 'course-btn';
        button.textContent = courseName;
        button.draggable = true;

        // Add the same drag event listeners as other course buttons
        button.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', button.textContent);
            button.classList.add('dragging');
        });

        button.addEventListener('dragend', () => {
            button.classList.remove('dragging');
        });

        // Add click handler for returning to list
        button.addEventListener('click', (e) => {
            const slot = button.closest('.course-slot');
            if (slot) {
                button.style.border = '';
                const isDCSCourse = button.textContent.startsWith('DCS') || button.textContent === 'Capstone';
                const courseList = isDCSCourse ? 
                    document.querySelector('.course-list.left .course-buttons') : 
                    document.querySelector('.course-list.right .course-buttons');
                insertAtOriginalPosition(button, courseList);
                e.stopPropagation();
                validateAllCourses();
            }
        });

        return button;
    }

    // Function to create prerequisite group HTML
    function createPrereqGroup(prereqGroup) {
        if (Array.isArray(prereqGroup)) {
            // Create an OR group container
            const orGroup = document.createElement('div');
            orGroup.className = 'or-group';
            
            prereqGroup.forEach((item, index) => {
                if (index > 0) {
                    const operator = document.createElement('span');
                    operator.className = 'prereq-operator or';
                    operator.textContent = 'OR';
                    orGroup.appendChild(operator);
                }
                orGroup.appendChild(createCourseButton(item));
            });
            return orGroup;
        } else {
            return createCourseButton(prereqGroup);
        }
    }

    // Function to update the missing prerequisites list
    function updateMissingPrerequisitesList() {
        const missingPrereqList = document.querySelector('.course-list.right .course-buttons');
        missingPrereqList.innerHTML = '';
        const allSemesters = Array.from(document.querySelectorAll('.semester'));
        
        allSemesters.forEach((semester, semesterIndex) => {
            const previousCourses = [];
            // Collect all courses from previous semesters
            for (let i = 0; i < semesterIndex; i++) {
                const semesterSlots = allSemesters[i].querySelectorAll('.course-slot');
                semesterSlots.forEach(slot => {
                    const courseBtn = slot.querySelector('.course-btn');
                    if (courseBtn) previousCourses.push(courseBtn.textContent);
                });
            }
            
            // Check current semester courses for missing prerequisites
            const slots = semester.querySelectorAll('.course-slot');
            slots.forEach(slot => {
                const courseButton = slot.querySelector('.course-btn');
                if (courseButton && prerequisites[courseButton.textContent]) {
                    const prereq = prerequisites[courseButton.textContent];
                    if (prereq.requires === 'NONE') return;

                    const missingPrereqs = getMissingPrerequisites(courseButton.textContent, previousCourses);
                    if (missingPrereqs.length > 0) {
                        const prereqContainer = document.createElement('div');
                        prereqContainer.className = 'missing-prereq';
                        prereqContainer.innerHTML = `<strong>${courseButton.textContent} needs:</strong>`;

                        switch (prereq.requires) {
                            case 'DCS1XX':
                                prereqContainer.appendChild(createPrereqGroup('DCS 109D'));
                                break;
                            case 'DCS2XX':
                                prereqContainer.appendChild(createPrereqGroup('DCS 204'));
                                break;
                            case 'ANY_DCS':
                                prereqContainer.appendChild(createPrereqGroup('DCS 106'));
                                break;
                            case 'OR':
                                prereqContainer.appendChild(createPrereqGroup(prereq.courses));
                                break;
                            case 'AND':
                                prereq.courses.forEach((course, index) => {
                                    if (index > 0) {
                                        const operator = document.createElement('span');
                                        operator.className = 'prereq-operator and';
                                        operator.textContent = 'AND';
                                        prereqContainer.appendChild(operator);
                                    }
                                    prereqContainer.appendChild(createPrereqGroup(course));
                                });
                                break;
                            default:
                                prereqContainer.appendChild(createPrereqGroup(prereq.requires));
                        }

                        missingPrereqList.appendChild(prereqContainer);
                    }
                }
            });
        });
    }

    // Function to validate all courses in the schedule
    function validateAllCourses() {
        const allSemesters = Array.from(document.querySelectorAll('.semester'));
        
        // Check for duplicate 109 courses
        const allSelectedCourses = getAllSelectedCourses();
        const has109Course = allSelectedCourses.some(course => 
            course.match(/^DCS 109[DRST]?$/) || course === 'DCS 111');
        const duplicate109Courses = [];
        
        allSemesters.forEach((semester, semesterIndex) => {
            const slots = semester.querySelectorAll('.course-slot');
            slots.forEach(slot => {
                const courseButton = slot.querySelector('.course-btn');
                if (courseButton) {
                    // Check prerequisites
                    const hasPrerequisites = checkPrerequisites(courseButton.textContent, slot);
                    
                    // Check for duplicate 109 courses
                    const is109Course = courseButton.textContent.match(/^DCS 109[DRST]?$/) || 
                                        courseButton.textContent === 'DCS 111';
                    
                    if (is109Course && has109Course) {
                        // If this is a 109 course and we already have one selected
                        const otherCourses = allSelectedCourses.filter(c => 
                            (c.match(/^DCS 109[DRST]?$/) || c === 'DCS 111') && 
                            c !== courseButton.textContent);
                            
                        if (otherCourses.length > 0) {
                            duplicate109Courses.push(courseButton.textContent);
                            courseButton.style.border = '2px solid red';
                        } else {
                            courseButton.style.border = hasPrerequisites ? '2px solid #00c853' : '2px solid red';
                        }
                    } else {
                        courseButton.style.border = hasPrerequisites ? '2px solid #00c853' : '2px solid red';
                    }
                }
            });
        });
        
        // Update the missing prerequisites list
        updateMissingPrerequisitesList();
        
        // Add duplicate 109 course warnings to the missing prerequisites list
        if (duplicate109Courses.length > 0) {
            const missingPrereqList = document.querySelector('.course-list.right .course-buttons');
            const warningContainer = document.createElement('div');
            warningContainer.className = 'missing-prereq';
            warningContainer.innerHTML = `<strong>Warning:</strong> You can only take one of the DCS 109/111 courses. Please remove:`;
            
            duplicate109Courses.forEach(course => {
                const courseElement = document.createElement('div');
                courseElement.className = 'duplicate-course-warning';
                courseElement.textContent = course;
                warningContainer.appendChild(courseElement);
            });
            
            missingPrereqList.appendChild(warningContainer);
        }
        
        // Update See Results button state
        updateSeeResultsButton();
    }

    // Function to insert button at correct position
    function insertAtOriginalPosition(button, courseList) {
        const pos = buttonPositions.get(button.textContent);
        const buttons = courseList.querySelectorAll('.course-btn');
        let inserted = false;

        // Find the first button that should come after our button
        for (let i = 0; i < buttons.length; i++) {
            const currentPos = buttonPositions.get(buttons[i].textContent);
            if (currentPos.index > pos.index) {
                courseList.insertBefore(button, buttons[i]);
                inserted = true;
                break;
            }
        }

        // If we didn't insert before any existing button, append at the end
        if (!inserted) {
            courseList.appendChild(button);
        }
    }

    // Make course buttons draggable
    courseButtons.forEach(button => {
        button.draggable = true;
        
        // Add click handler to return to course list when clicked in a slot
        button.addEventListener('click', (e) => {
            const slot = button.closest('.course-slot');
            if (slot) {
                // Remove any error styling
                button.style.border = '';
                
                // Find the appropriate course list (left or right)
                const isDCSCourse = button.textContent.startsWith('DCS') || button.textContent === 'Capstone';
                const courseList = isDCSCourse ? 
                    document.querySelector('.course-list.left .course-buttons') : 
                    document.querySelector('.course-list.right .course-buttons');
                
                // Return the button to its original position
                insertAtOriginalPosition(button, courseList);
                e.stopPropagation(); // Prevent slot click event

                // Validate all courses and update missing prerequisites list
                validateAllCourses();
            }
        });
        
        button.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', button.textContent);
            button.classList.add('dragging');
            
            // Show description popup when dragging a DCS course
            const courseName = button.textContent;
            if (courseName.startsWith('DCS') || courseName === 'Capstone') {
                // Populate popup with course information
                const popupTitle = dragDescriptionPopup.querySelector('.popup-title');
                const popupBody = dragDescriptionPopup.querySelector('.popup-body');
                popupTitle.textContent = courseName;
                popupBody.textContent = courseDescriptions[courseName] || 'No description available.';
                
                // Show the popup
                dragDescriptionPopup.style.display = 'block';
            }
        });

        button.addEventListener('dragend', () => {
            button.classList.remove('dragging');
            
            // Hide the description popup
            dragDescriptionPopup.style.display = 'none';
        });
    });

    // Update mouse position during drag to position the popup
    document.addEventListener('dragover', (e) => {
        if (dragDescriptionPopup.style.display === 'block') {
            // Position the popup at the right side of the screen
            const windowWidth = window.innerWidth;
            const popupWidth = 350; // Updated fixed width from CSS
            
            // Position popup at right side of screen
            dragDescriptionPopup.style.left = `${windowWidth - popupWidth - 30}px`;
            
            // Get the actual height of the content
            const popupHeight = dragDescriptionPopup.offsetHeight;
            const mouseY = e.clientY;
            const windowHeight = window.innerHeight;
            
            // First attempt to center on mouse
            let topPosition = mouseY - (popupHeight / 2);
            
            // Adjust if we're off screen
            if (topPosition < 20) {
                topPosition = 20; // Keep some margin at the top
            }
            
            // If the popup would extend beyond the bottom of the screen,
            // adjust it to start from the top with enough space to show as much as possible
            if (topPosition + popupHeight > windowHeight - 20) {
                // If the popup is taller than the viewport (minus margins)
                if (popupHeight > windowHeight - 40) {
                    // Just place it at the top with a small margin
                    topPosition = 20;
                } else {
                    // Otherwise position it so it fits entirely on screen
                    topPosition = windowHeight - popupHeight - 20;
                }
            }
            
            dragDescriptionPopup.style.top = `${topPosition}px`;
        }
    });

    // Handle dropping on course slots
    courseSlots.forEach(slot => {
        slot.addEventListener('dragover', (e) => {
            e.preventDefault();
            slot.classList.add('dragover');
        });

        slot.addEventListener('dragleave', () => {
            slot.classList.remove('dragover');
        });

        slot.addEventListener('drop', (e) => {
            e.preventDefault();
            slot.classList.remove('dragover');
            
            // Find the dragged button
            const draggedButton = document.querySelector('.course-btn.dragging');
            if (!draggedButton) return;

            // If slot already has a button, swap it back to course list
            const existingButton = slot.querySelector('.course-btn');
            if (existingButton) {
                const isDCSCourse = existingButton.textContent.startsWith('DCS') || existingButton.textContent === 'Capstone';
                const courseList = isDCSCourse ? 
                    document.querySelector('.course-list.left .course-buttons') : 
                    document.querySelector('.course-list.right .course-buttons');
                insertAtOriginalPosition(existingButton, courseList);
            }

            // Move the dragged button to the slot
            slot.innerHTML = '';
            slot.appendChild(draggedButton);

            // Validate all courses and update missing prerequisites list
            validateAllCourses();
        });
    });

    // Handle See Results button functionality
    const seeResultsBtn = document.getElementById('see-results-btn');
    const resultsFeedback = document.getElementById('results-feedback');
    const resultsModal = document.getElementById('results-modal');
    const resultsContent = document.getElementById('results-modal-content');
    const closeResultsBtn = document.getElementById('close-results-modal');

    // Function to collect all selected courses
    function getAllSelectedCourses() {
        const courses = [];
        const allSemesters = Array.from(document.querySelectorAll('.semester'));
        allSemesters.forEach(semester => {
            const slots = semester.querySelectorAll('.course-slot');
            slots.forEach(slot => {
                const courseButton = slot.querySelector('.course-btn');
                if (courseButton) {
                    courses.push(courseButton.textContent);
                }
            });
        });
        return courses;
    }

    // Function to check if all prerequisites are met
    function checkAllPrerequisitesMet() {
        const allSemesters = Array.from(document.querySelectorAll('.semester'));
        
        // Check for duplicate 109 courses
        const allSelectedCourses = getAllSelectedCourses();
        const has109Courses = allSelectedCourses.filter(course => 
            course.match(/^DCS 109[DRST]?$/) || course === 'DCS 111');
            
        if (has109Courses.length > 1) {
            return false;
        }
        
        for (let semesterIndex = 0; semesterIndex < allSemesters.length; semesterIndex++) {
            const semester = allSemesters[semesterIndex];
            const previousCourses = [];
            
            // Collect all courses from previous semesters
            for (let i = 0; i < semesterIndex; i++) {
                const semesterSlots = allSemesters[i].querySelectorAll('.course-slot');
                semesterSlots.forEach(slot => {
                    const courseBtn = slot.querySelector('.course-btn');
                    if (courseBtn) previousCourses.push(courseBtn.textContent);
                });
            }
            
            // Check current semester courses for missing prerequisites
            const slots = semester.querySelectorAll('.course-slot');
            for (let slot of slots) {
                const courseButton = slot.querySelector('.course-btn');
                if (courseButton && prerequisites[courseButton.textContent]) {
                    const missingPrereqs = getMissingPrerequisites(courseButton.textContent, previousCourses);
                    if (missingPrereqs.length > 0) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    // Function to update See Results button state
    function updateSeeResultsButton() {
        const hasSelectedCourses = getAllSelectedCourses().length > 0;
        const allPrereqsMet = checkAllPrerequisitesMet();
        
        if (hasSelectedCourses && allPrereqsMet) {
            seeResultsBtn.disabled = false;
            resultsFeedback.textContent = "";
        } else {
            seeResultsBtn.disabled = true;
            if (!hasSelectedCourses) {
                resultsFeedback.textContent = "Add at least one course to see results.";
            } else {
                resultsFeedback.textContent = "Some courses are missing prerequisites.";
            }
        }
    }

    // Function to check major progress
    function checkMajorProgress(selectedCourses) {
        const results = [];
        const usedCourses = new Map(); // Track courses and count of usage
        
        // Helper to find matching course and track usage
        function findMatchingCourse(options, categoryName) {
            for (const course of selectedCourses) {
                // If course exists in options and hasn't been used twice yet
                if (options.includes(course) && (!usedCourses.has(course) || usedCourses.get(course) < 2)) {
                    if (!usedCourses.has(course)) {
                        usedCourses.set(course, 1);
                    } else {
                        usedCourses.set(course, usedCourses.get(course) + 1);
                    }
                    return course;
                }
            }
            return null;
        }
        
        function checkCourseType(checkFn) {
            return selectedCourses.filter(course => 
                (!usedCourses.has(course) || usedCourses.get(course) < 2) && checkFn(course)
            );
        }
        
        // Check CS Methods requirements (these are regular - max usage doesn't apply)
        // Create separate tracking for CS Methods to ensure they're always filled first
        const csMethodsUsed = new Set();
        
        function findCSMethodCourse(options) {
            for (const course of selectedCourses) {
                if (!csMethodsUsed.has(course) && options.includes(course)) {
                    csMethodsUsed.add(course);
                    // Also mark in the general usage tracker
                    if (!usedCourses.has(course)) {
                        usedCourses.set(course, 1);
                    } else {
                        usedCourses.set(course, usedCourses.get(course) + 1);
                    }
                    return course;
                }
            }
            return null;
        }
        
        // 1. CS Methods (Introduction to Programming)
        const introProgCourse = findCSMethodCourse(majorRequirements.csMethod1.options);
        results.push(introProgCourse ? 
            `✅ ${majorRequirements.csMethod1.name}: ${introProgCourse}` : 
            `❌ ${majorRequirements.csMethod1.name}: Missing`);
            
        // 2. CS Methods (Software Development)
        const softwareCourse = findCSMethodCourse(majorRequirements.csMethod2.options);
        results.push(softwareCourse ? 
            `✅ ${majorRequirements.csMethod2.name}: ${softwareCourse}` : 
            `❌ ${majorRequirements.csMethod2.name}: Missing`);
        
        // Check Core Methods requirements
        // 3. Data Science & Analysis
        const dataScience = findMatchingCourse(majorRequirements.coreMethod1.options, majorRequirements.coreMethod1.name);
        results.push(dataScience ? 
            `✅ ${majorRequirements.coreMethod1.name}: ${dataScience}` : 
            `❌ ${majorRequirements.coreMethod1.name}: Missing`);
            
        // 4. Critical Digital Studies
        const criticalDigital = findMatchingCourse(majorRequirements.coreMethod2.options, majorRequirements.coreMethod2.name);
        results.push(criticalDigital ? 
            `✅ ${majorRequirements.coreMethod2.name}: ${criticalDigital}` : 
            `❌ ${majorRequirements.coreMethod2.name}: Missing`);
            
        // 5. Human-Centered Design
        const humanCentered = findMatchingCourse(majorRequirements.coreMethod3.options, majorRequirements.coreMethod3.name);
        results.push(humanCentered ? 
            `✅ ${majorRequirements.coreMethod3.name}: ${humanCentered}` : 
            `❌ ${majorRequirements.coreMethod3.name}: Missing`);
            
        // 6. Community-Engaged Learning
        const communityEngaged = findMatchingCourse(majorRequirements.coreMethod4.options, majorRequirements.coreMethod4.name);
        results.push(communityEngaged ? 
            `✅ ${majorRequirements.coreMethod4.name}: ${communityEngaged}` : 
            `❌ ${majorRequirements.coreMethod4.name}: Missing`);
        
        // Track which course is used for which method (for display purposes)
        const methodsUsage = new Map();
        for (const [course, count] of usedCourses.entries()) {
            if (count === 2) {
                methodsUsage.set(course, []);
                // Find which methods this course is used for
                if (course === dataScience) methodsUsage.get(course).push(majorRequirements.coreMethod1.name);
                if (course === criticalDigital) methodsUsage.get(course).push(majorRequirements.coreMethod2.name);
                if (course === humanCentered) methodsUsage.get(course).push(majorRequirements.coreMethod3.name);
                if (course === communityEngaged) methodsUsage.get(course).push(majorRequirements.coreMethod4.name);
            }
        }
        
        // Add note about courses used for multiple methods
        if ([...methodsUsage.entries()].length > 0) {
            results.push(`ℹ️ Note: The following courses fulfill multiple methods:`);
            for (const [course, methods] of methodsUsage.entries()) {
                if (methods.length > 1) {
                    results.push(`   - ${course}: ${methods.join(' and ')}`);
                }
            }
        }
        
        // 7. Check 300-level electives 
        // These should look for courses not already used or used only once
        const electives300 = checkCourseType(majorRequirements.electives300.check);
        
        if (electives300.length >= 2) {
            // Mark the first two as used for electives
            if (!usedCourses.has(electives300[0])) {
                usedCourses.set(electives300[0], 1);
            } else {
                usedCourses.set(electives300[0], 2); // Max out usage
            }
            
            if (!usedCourses.has(electives300[1])) {
                usedCourses.set(electives300[1], 1);
            } else {
                usedCourses.set(electives300[1], 2); // Max out usage
            }
            
            results.push(`✅ ${majorRequirements.electives300.name}: ${electives300.slice(0,2).join(', ')}`);
        } else {
            results.push(`❌ ${majorRequirements.electives300.name}: Found ${electives300.length}, need 2`);
        }
        
        // 8. Capstone - can be used without restrictions
        const capstone = selectedCourses.find(c => majorRequirements.capstone.check(c));
        results.push(capstone ? 
            `✅ ${majorRequirements.capstone.name}: ${capstone}` : 
            `❌ ${majorRequirements.capstone.name}: Missing`);
        
        // 9. Count short term courses
        const shortTerms = selectedCourses.filter(c => majorRequirements.shortTerm.check(c));
        const shortTermsUsed = Math.min(shortTerms.length, majorRequirements.shortTerm.max);
        results.push(`ℹ️ Short Term Courses: ${shortTermsUsed}/${majorRequirements.shortTerm.max} (max 2 count toward the major)`);
        
        // Total courses needed
        const totalRequired = 10;
        // Only count DCS courses (or Capstone) towards the major, limiting short term courses to max 2
        const totalDCSCourses = selectedCourses.filter(course => {
            // Count all non-short-term DCS courses
            if ((course.startsWith('DCS') && !majorRequirements.shortTerm.check(course)) || course === 'Capstone') {
                return true;
            }
            // Count short term courses but only up to 2
            return majorRequirements.shortTerm.check(course) && shortTerms.indexOf(course) < majorRequirements.shortTerm.max;
        }).length;
        results.push(`${totalDCSCourses >= totalRequired ? '✅' : '❌'} Total Courses: ${totalDCSCourses}/${totalRequired}`);
        
        return {
            results: results,
            complete: totalDCSCourses >= totalRequired && 
                     introProgCourse && softwareCourse && dataScience && 
                     criticalDigital && humanCentered && communityEngaged && 
                     electives300.length >= 2 && capstone
        };
    }
    
    // See Results button click handler
    seeResultsBtn.addEventListener('click', () => {
        const selectedCourses = getAllSelectedCourses();
        const progress = checkMajorProgress(selectedCourses);
        
        // Create HTML for results
        let html = '';
        html += progress.complete ? 
            '<div style="color:green;font-weight:bold;margin-bottom:20px;">✅ You have met all major requirements!</div>' : 
            '<div style="color:red;font-weight:bold;margin-bottom:20px;">❌ Some major requirements are not met.</div>';
        
        html += '<div style="margin-bottom:20px;"><strong>Major Requirements Progress:</strong></div>';
        progress.results.forEach(result => {
            html += `<div style="margin-bottom:10px;">${result}</div>`;
        });
        
        html += '<div style="margin-top:20px;font-style:italic;font-size:0.9rem;">Note: For yellow core methods courses, no course can count for more than 2 methods.</div>';
        
        // Display modal
        resultsContent.innerHTML = html;
        resultsModal.style.display = 'flex';
    });
    
    // Close modal button
    closeResultsBtn.addEventListener('click', () => {
        resultsModal.style.display = 'none';
    });
    
    // Initialize button state
    updateSeeResultsButton();
    
    // Have all drops trigger validation
    document.querySelectorAll('.course-slot').forEach(slot => {
        const originalDrop = slot.ondrop;
        slot.addEventListener('drop', (e) => {
            setTimeout(validateAllCourses, 10); // Validate after the drop event completes
        });
    });
}); 