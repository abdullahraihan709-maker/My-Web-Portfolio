/* Abdullah Raihan — 3D orbital tech stack sphere. No dependencies. */
(() => {
  "use strict";

  const stage = document.querySelector("[data-orbit-stage]");
  if (!stage) return;

  const pathsGroup = stage.querySelector("[data-orbit-paths]");
  const nodesGroup = stage.querySelector("[data-orbit-nodes]");
  const skillLayer = stage.querySelector("[data-orbit-skills]");
  if (!pathsGroup || !nodesGroup || !skillLayer) return;

  const SVG_NS = "http://www.w3.org/2000/svg";
  const VIEW_HALF = 230;
  const MESH_RADIUS = 223;
  const TAG_RADIUS = 200;
  const LATITUDE_STEPS = 9;
  const LONGITUDE_STEPS = 20;

  // Simple Icons paths (24x24 viewBox).
  const ICONS = {
    git: '<path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>',
    mongodb: '<path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>',
    github: '<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>',
    nextjs: '<path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z"/>',
    tailwind: '<path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>',
    javascript: '<path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>',
    typescript: '<path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>',
    react: '<path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>',
    nodejs: '<path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L2.46,6.68C2.376,6.729,2.322,6.825,2.322,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-3.888-3.076c-2.572,0-4.212,1.087-4.212,2.912 c0,1.98,1.531,2.523,4.006,2.768c2.954,0.293,3.186,0.723,3.186,1.306c0,1.011-0.811,1.437-2.715,1.437 c-2.371,0-2.888-0.595-3.064-1.773c-0.018-0.123-0.124-0.214-0.25-0.214h-1.141c-0.141,0-0.254,0.114-0.254,0.254 c0,1.503,0.815,3.307,4.709,3.307C17.641,17.269,19.099,16.161,19.099,13.993z"/>',
    express: '<path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z"/>',
    html5: '<path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>',
    css: '<path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>',
  };

  const SKILLS = [
    { name: "Next.js", icon: ICONS.nextjs, color: "#f4f1ff", colorLight: "#171b26" },
    { name: "React", icon: ICONS.react, color: "#61dafb", colorLight: "#0d7f9e" },
    { name: "TypeScript", icon: ICONS.typescript, color: "#3178c6", colorLight: "#2a6cb0" },
    { name: "JavaScript", icon: ICONS.javascript, color: "#f7df1e", colorLight: "#9a7d00" },
    { name: "HTML5", icon: ICONS.html5, color: "#e34f26", colorLight: "#c53d17" },
    { name: "CSS", icon: ICONS.css, color: "#1572b6", colorLight: "#12629c" },
    { name: "Tailwind CSS", icon: ICONS.tailwind, color: "#38bdf8", colorLight: "#0a87b8" },
    { name: "Node.js", icon: ICONS.nodejs, color: "#6da55f", colorLight: "#4a7d3e" },
    { name: "Express.js", icon: ICONS.express, color: "#e9e6f4", colorLight: "#2d3a58" },
    { name: "MongoDB", icon: ICONS.mongodb, color: "#47a248", colorLight: "#2f7a30" },
    { name: "Better Auth", initials: "BA", color: "#d4aaff", colorLight: "#6b3fc4" },
    { name: "DaisyUI", initials: "D", color: "#ff87cf", colorLight: "#c72e8f" },
    { name: "Hero UI", initials: "H", color: "#d4aaff", colorLight: "#6b3fc4" },
    { name: "Git", icon: ICONS.git, color: "#f05032", colorLight: "#d63a1f" },
    { name: "GitHub", icon: ICONS.github, color: "#f4f1ff", colorLight: "#171b26" },
  ];

  const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

  // Even Fibonacci distribution keeps the labels from clustering.
  const SKILL_POINTS = SKILLS.map((skill, index) => {
    const y = 1 - (2 * (index + 0.5)) / SKILLS.length;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = GOLDEN_ANGLE * index;
    return {
      ...skill,
      point3D: {
        x: Math.cos(theta) * radius,
        y,
        z: Math.sin(theta) * radius,
      },
    };
  });

  const MESH = [];
  for (let latIndex = 0; latIndex <= LATITUDE_STEPS; latIndex += 1) {
    const latitude = -Math.PI / 2 + (Math.PI * latIndex) / LATITUDE_STEPS;
    const row = [];
    for (let lonIndex = 0; lonIndex < LONGITUDE_STEPS; lonIndex += 1) {
      const longitude = (Math.PI * 2 * lonIndex) / LONGITUDE_STEPS;
      row.push({
        x: Math.cos(latitude) * Math.sin(longitude),
        y: Math.sin(latitude),
        z: Math.cos(latitude) * Math.cos(longitude),
      });
    }
    MESH.push(row);
  }

  function multiplyMatrices(a, b) {
    return [
      a[0] * b[0] + a[1] * b[3] + a[2] * b[6],
      a[0] * b[1] + a[1] * b[4] + a[2] * b[7],
      a[0] * b[2] + a[1] * b[5] + a[2] * b[8],
      a[3] * b[0] + a[4] * b[3] + a[5] * b[6],
      a[3] * b[1] + a[4] * b[4] + a[5] * b[7],
      a[3] * b[2] + a[4] * b[5] + a[5] * b[8],
      a[6] * b[0] + a[7] * b[3] + a[8] * b[6],
      a[6] * b[1] + a[7] * b[4] + a[8] * b[7],
      a[6] * b[2] + a[7] * b[5] + a[8] * b[8],
    ];
  }

  function createRotationMatrix(yawDelta, pitchDelta) {
    const cy = Math.cos(yawDelta);
    const sy = Math.sin(yawDelta);
    const rotY = [cy, 0, sy, 0, 1, 0, -sy, 0, cy];

    const cx = Math.cos(pitchDelta);
    const sx = Math.sin(pitchDelta);
    const rotX = [1, 0, 0, 0, cx, sx, 0, -sx, cx];

    return multiplyMatrices(rotX, rotY);
  }

  function applyMatrix(point, matrix) {
    return {
      x: point.x * matrix[0] + point.y * matrix[1] + point.z * matrix[2],
      y: point.x * matrix[3] + point.y * matrix[4] + point.z * matrix[5],
      z: point.x * matrix[6] + point.y * matrix[7] + point.z * matrix[8],
    };
  }

  function project(point, matrix, radius) {
    const rotated = applyMatrix(point, matrix);
    const perspective = 1 / (1.02 - rotated.z * 0.08);
    return {
      x: rotated.x * radius * perspective,
      y: rotated.y * radius * perspective,
      z: rotated.z,
      depth: (rotated.z + 1) / 2,
    };
  }

  let rotationMatrix = createRotationMatrix(-0.08, 0.05);
  let activeSkill = null;
  let isDragging = false;
  let lastFrame = 0;
  let rafId = 0;
  let isVisible = false;
  const pointer = { x: 0, y: 0, pointerId: -1, moved: false };
  const velocity = { x: 0, y: 0 };

  // Build the wireframe once; only coordinates change per frame.
  const pathElements = [];
  for (let row = 0; row <= LATITUDE_STEPS; row += 1) {
    for (let column = 0; column < LONGITUDE_STEPS; column += 1) {
      const createPath = (strength) => {
        const path = document.createElementNS(SVG_NS, "path");
        path.setAttribute("stroke", "currentColor");
        path.setAttribute("stroke-width", "0.62");
        path.setAttribute("fill", "none");
        pathsGroup.appendChild(path);
        return { el: path, strength };
      };

      pathElements.push({
        row,
        column,
        horizontal: createPath(1),
        vertical: row < LATITUDE_STEPS ? createPath(1) : null,
        diagonal: row < LATITUDE_STEPS ? createPath(0.55) : null,
      });
    }
  }

  const nodeElements = [];
  const totalMeshPoints = (LATITUDE_STEPS + 1) * LONGITUDE_STEPS;
  for (let index = 0; index < totalMeshPoints; index += 2) {
    const circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttribute("r", "1.05");
    circle.setAttribute("fill", "currentColor");
    nodesGroup.appendChild(circle);
    nodeElements.push({ index, el: circle });
  }

  const skillButtons = SKILL_POINTS.map((skill) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tech-orbit__skill";
    button.style.setProperty("--skill-color", skill.color);
    button.style.setProperty("--skill-color-light", skill.colorLight || skill.color);
    button.setAttribute("aria-label", `${skill.name} skill`);
    button.setAttribute("aria-pressed", "false");
    button.title = skill.name;

    const icon = document.createElement("span");
    icon.className = "tech-orbit__icon";
    if (skill.icon) {
      icon.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${skill.icon}</svg>`;
    } else {
      icon.classList.add("tech-orbit__icon--text");
      icon.textContent = skill.initials;
      icon.setAttribute("aria-hidden", "true");
    }

    const label = document.createElement("span");
    label.className = "tech-orbit__label";
    label.textContent = skill.name;
    label.setAttribute("aria-hidden", "true");

    button.appendChild(icon);
    button.appendChild(label);

    button.addEventListener("pointerdown", (event) => event.stopPropagation());
    button.addEventListener("click", () => {
      activeSkill = activeSkill === skill.name ? null : skill.name;
      render();
    });
    button.addEventListener("mouseenter", render);
    button.addEventListener("mouseleave", render);
    button.addEventListener("focus", render);
    button.addEventListener("blur", render);

    skillLayer.appendChild(button);
    return { skill, button };
  });

  function render() {
    const meshBoost = document.documentElement.dataset.theme === "light" ? 1.5 : 1;
    const projectedMesh = MESH.map((row) =>
      row.map((point) => project(point, rotationMatrix, MESH_RADIUS))
    );

    for (let i = 0; i < pathElements.length; i += 1) {
      const item = pathElements[i];
      const point = projectedMesh[item.row][item.column];
      const next = projectedMesh[item.row][(item.column + 1) % LONGITUDE_STEPS];

      const horizontalDepth = (point.depth + next.depth) / 2;
      item.horizontal.el.setAttribute(
        "d",
        `M ${point.x.toFixed(2)} ${point.y.toFixed(2)} L ${next.x.toFixed(2)} ${next.y.toFixed(2)}`
      );
      item.horizontal.el.setAttribute(
        "stroke-opacity",
        ((0.03 + horizontalDepth * 0.12) * item.horizontal.strength * meshBoost).toFixed(3)
      );

      if (item.vertical) {
        const below = projectedMesh[item.row + 1][item.column];
        const verticalDepth = (point.depth + below.depth) / 2;
        item.vertical.el.setAttribute(
          "d",
          `M ${point.x.toFixed(2)} ${point.y.toFixed(2)} L ${below.x.toFixed(2)} ${below.y.toFixed(2)}`
        );
        item.vertical.el.setAttribute(
          "stroke-opacity",
          ((0.03 + verticalDepth * 0.12) * item.vertical.strength * meshBoost).toFixed(3)
        );
      }

      if (item.diagonal) {
        const diagonal = projectedMesh[item.row + 1][(item.column + 1) % LONGITUDE_STEPS];
        const diagonalDepth = (point.depth + diagonal.depth) / 2;
        item.diagonal.el.setAttribute(
          "d",
          `M ${point.x.toFixed(2)} ${point.y.toFixed(2)} L ${diagonal.x.toFixed(2)} ${diagonal.y.toFixed(2)}`
        );
        item.diagonal.el.setAttribute(
          "stroke-opacity",
          ((0.03 + diagonalDepth * 0.12) * item.diagonal.strength * meshBoost).toFixed(3)
        );
      }
    }

    const flatMesh = projectedMesh.flat();
    for (let i = 0; i < nodeElements.length; i += 1) {
      const node = nodeElements[i];
      const point = flatMesh[node.index];
      node.el.setAttribute("cx", point.x.toFixed(2));
      node.el.setAttribute("cy", point.y.toFixed(2));
      node.el.setAttribute("opacity", ((0.035 + point.depth * 0.15) * meshBoost).toFixed(3));
    }

    for (let i = 0; i < skillButtons.length; i += 1) {
      const { skill, button } = skillButtons[i];
      const point = project(skill.point3D, rotationMatrix, TAG_RADIUS);
      const frontness = point.depth;
      const isActive = activeSkill === skill.name;
      const isHovered = button.matches(":hover") || button.matches(":focus-visible");
      const showLabel = isActive || isHovered || frontness > 0.66;
      const scale = 0.62 + frontness * 0.43;
      const opacity = 0.12 + Math.pow(frontness, 1.35) * 0.88;

      button.style.left = `${(50 + (point.x / VIEW_HALF) * 50).toFixed(3)}%`;
      button.style.top = `${(50 + (point.y / VIEW_HALF) * 50).toFixed(3)}%`;
      button.style.opacity = isActive || isHovered ? "1" : opacity.toFixed(3);
      button.style.zIndex = String(
        Math.round(frontness * 100) + (isHovered ? 200 : 0) + (isActive ? 300 : 0)
      );
      button.style.transform = `translate(-50%, -50%) scale(${(isActive ? 1.12 : scale).toFixed(3)})`;
      button.style.pointerEvents = frontness > 0.45 || isActive ? "auto" : "none";
      button.setAttribute("aria-pressed", String(isActive));

      if (showLabel) {
        button.setAttribute("data-label-visible", "");
      } else {
        button.removeAttribute("data-label-visible");
      }
    }
  }

  function applyDeltaRotation(yawDelta, pitchDelta) {
    const deltaMatrix = createRotationMatrix(yawDelta, pitchDelta);
    rotationMatrix = multiplyMatrices(deltaMatrix, rotationMatrix);
  }

  stage.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) return;
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.pointerId = event.pointerId;
    pointer.moved = false;
    isDragging = true;
    stage.setPointerCapture(event.pointerId);
  });

  stage.addEventListener("pointermove", (event) => {
    if (!isDragging || pointer.pointerId !== event.pointerId) return;
    const dx = event.clientX - pointer.x;
    const dy = event.clientY - pointer.y;
    if (Math.abs(dx) + Math.abs(dy) > 1) pointer.moved = true;
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    velocity.x = dx * 0.0009;
    velocity.y = dy * 0.0009;
    applyDeltaRotation(dx * 0.005, dy * 0.005);
    render();
  });

  const handlePointerEnd = (event) => {
    if (pointer.pointerId !== event.pointerId) return;
    isDragging = false;
    pointer.pointerId = -1;
    if (!pointer.moved) {
      velocity.x = 0;
      velocity.y = 0;
    }
    window.setTimeout(() => {
      pointer.moved = false;
    }, 70);
  };

  stage.addEventListener("pointerup", handlePointerEnd);
  stage.addEventListener("pointercancel", handlePointerEnd);

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let reduceMotion = motionQuery.matches;

  function animate(time) {
    const delta = lastFrame ? Math.min((time - lastFrame) / 16.67, 2) : 1;
    lastFrame = time;

    if (!pointer.moved && !isDragging && !reduceMotion) {
      applyDeltaRotation((0.00165 + velocity.x) * delta, velocity.y * delta);
      velocity.x *= 0.94;
      velocity.y *= 0.94;
      if (Math.abs(velocity.x) < 0.00004) velocity.x = 0;
      if (Math.abs(velocity.y) < 0.00004) velocity.y = 0;
    }

    render();
    rafId = requestAnimationFrame(animate);
  }

  function start() {
    if (rafId || reduceMotion) return;
    lastFrame = 0;
    rafId = requestAnimationFrame(animate);
  }

  function stop() {
    if (!rafId) return;
    cancelAnimationFrame(rafId);
    rafId = 0;
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !document.hidden) start();
        else stop();
      },
      { rootMargin: "120px" }
    );
    observer.observe(stage);
  } else {
    isVisible = true;
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else if (isVisible) start();
  });

  motionQuery.addEventListener?.("change", (event) => {
    reduceMotion = event.matches;
    if (reduceMotion) stop();
    else if (isVisible && !document.hidden) start();
  });

  render();
  start();
})();
