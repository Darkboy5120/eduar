let mainmenu_el = document.querySelector(".mainmenu-container");
let coregame_el = document.querySelector(".coregame-container");

let mm_start_el = document.querySelector("#mm-start");
let mm_settings_el = document.querySelector("#mm-settings");

mm_start_el.addEventListener("click", () => {
    start_game();
});

const start_game = () => {
    const from_mainmenu_to_coregame = () => {
        mainmenu_el.classList.add("hidden");
        coregame_el.classList.remove("hidden");
    }

    const get_random_int = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
      }

    const create_characters = () => {
        class Fighter {
            constructor (health, attack_type, speed, cosmic_attack, physic_attack, side, team_el,
                skills_data) {
                this.currenthealth = health;
                this.maxhealth = health;
                this.attack_type = attack_type;
                this.speed = speed;
                this.cosmic_attack = cosmic_attack;
                this.physic_attack = physic_attack;
                this.side = side;
                this.node = null;
                this.skills_data = skills_data;

                this.create_node(team_el);
            }

            is_ally () {
                return (this.side == "ally") ? true : false;
            }

            automove () {
                console.log("auto move action");
            }

            create_node (team_el) {
                //add image to team node
                let node = document.createElement("DIV");
                node.classList.add("fighter-container");
                node.innerHTML = `
                    <div class="focus-arrow hidden"></div>
                    <img src="media/image/character/emiliano_hechicero/emiliano_hechicero.png" alt="">
                    <progress max="${this.maxhealth}" value="${this.currenthealth}"></progress>
                `;
                team_el.appendChild(node);
                this.node = node;
            }

            update () {
                //actualizar estados, vida, etc.
                this.node.querySelector("progress").value = this.currenthealth;
            }

            validate_numbers () {
                //limitamos el rango de ciertos valores
                if (this.currenthealth > this.maxhealth) {
                    this.currenthealth = this.maxhealth;
                } else if (this.currenthealth < this.maxhealth) {
                    this.currenthealth = 0;
                }
            }

            damage (n) {
                this.currenthealth -= n;
            }

            heal () {
                this.currenthealth += n;
            }

            focus () {
                this.node.querySelector(".fighter-container > .focus-arrow").classList.remove("hidden");
            }

            blur () {
                this.node.querySelector(".fighter-container > .focus-arrow").classList.add("hidden");
            }

            first_skill () {

            }
            second_skill () {
                
            }
            third_skill () {
                
            }
            fourt_skill () {
                
            }
        }

        class EmilianoHechicero extends Fighter {
            constructor (side, team_el) {
                let skills_data = {
                    first: {
                        image: "media/image/character/emiliano_hechicero/emiliano_hechicero.png", type: "active",
                        desc: "foo foo foo foo foo foo foo foo foo"
                    },
                    second: {
                        image: "media/image/character/emiliano_hechicero/emiliano_hechicero.png", type: "active",
                        desc: "foo foo foo foo foo foo foo foo foo foo"
                    },
                    third: {
                        image: "media/image/character/emiliano_hechicero/emiliano_hechicero.png", type: "active",
                        desc: "foo foo foo foo foo foo foo foo foo foo"
                    },
                    fourt: {
                        image: "media/image/character/emiliano_hechicero/emiliano_hechicero.png", type: "passive",
                        desc: "foo foo foo foo foo foo foo foo foo foo"
                    }
                };
                super(1000, "cosmic", 50, 100, 0, side, team_el, skills_data);
            }

            automove () {
                console.log("some magic attack");
            }
        }
        
        class Team {
            constructor (side, team_el) {
                this.members = [];
                this.maxmembers = 6;
                this.minmembers = 1;
                this.fill_team(side, team_el);
                this.update_order();
            }

            fill_team (side, team_el) {
                for (let i = 0; i < this.maxmembers; i++) {
                    this.members.push(new EmilianoHechicero(side, team_el));
                }
            }

            update_order () {
                this.members = Team.order_by_speed(this.members);
            }

            static order_by_speed (list) {
                let list_ordered = [];
                for (let i = 0; i < list.length; i++) {
                    if (list_ordered.length === 0) {
                        list_ordered.splice(0, 0, list[i]);
                        continue;
                    }

                    for (let j = 0; j < list_ordered.length; j++) {
                        if (list[i].speed < list_ordered[j].speed) {
                            list_ordered.splice(j, 0, list[i]);
                            break;
                        } else if (list[i].speed === list_ordered[j].speed) {
                            //random assign
                            if (get_random_int(1, 2) === 1) {
                                list_ordered.splice(j, 0, list[i]);
                            } else {
                                list_ordered.splice((j+1), 0, list[i]);
                            }
                            break;
                        }
                    }
                }
                return list_ordered;
            }
        }

        class Skill {
            constructor (selector) {
                this.image = null;
                this.desc = null;
                this.element = document.querySelector(selector);
                this.id = selector;
                this.element.id = selector;
                this.create_events();
                this.type = null;
                this.is_pressed = false;
                this.is_selected = false;
                this.press_button_timeout = null;
                this.press_button_timeout_delay = 500;
            }

            create_events () {
                this.onclick();
                this.onpressed();
            }

            update (src, type, desc) {
                this.image = src;
                this.desc = desc;
                this.set_image(src);
                if (type == "active") {
                    this.make_active();
                } else {
                    this.make_passive();
                }
            }

            set_image () {
                this.element.innerHTML = `
                    <img src="${this.image}" alt="skill">
                    <div class="description">${this.desc}</div>
                `;
            }

            make_passive () {
                this.type = "passive";
                this.element.classList.remove("active");
            }

            make_active () {
                this.type = "active";
                this.element.classList.add("active");
            }

            is_active () {
                return (this.type == "active") ? true : false;
            }

            lack_of_energy () {    
            }

            effect () {
            }

            set_effect () {
            }

            onclick () {
                if (this.is_active()) {
                    this.element.focus();
                }
                this.effect();
            }

            focus_possible_targets () {
                if (true) {
                    //los objetivos dependeran del tipo de habilidad, curar, atacar, etc.
                }
                //mientras tanto solo para atacar
                coregame_el.classList.add("focus-enemies");
                //focus-allies focus-all como posibles valores
            }

            blur_possible_targets () {
                coregame_el.classList.remove("focus-enemies", "focus-allies", "focus-all");
            }

            onpressed () {
                //se crea el evento timeout para poder mostrar los detalles de la habilidad
                const onstart = (e) => {
                    if (e.target.id === this.id
                        || e.target.parentNode.id === this.id
                        ) {
                        this.press_button_timeout = window.setTimeout(() => {
                            this.element.classList.add("pressed");
                            this.is_pressed = true;
                        }, this.press_button_timeout_delay);
                    } else {
                        this.element.classList.remove("focused");
                        this.blur_possible_targets();
                    }

                    if (this.is_pressed) {
                        this.is_pressed = false;
                        this.element.classList.remove("pressed");
                        clearTimeout(this.press_button_timeout);
                    }
                }
                //agrega el focus a la habilidad y cancela el evento timeout de los detalles
                const onend = () => {
                    this.element.classList.add("focused");
                    this.focus_possible_targets();
                    if (!this.is_pressed) {
                        this.element.classList.remove("pressed");
                        clearTimeout(this.press_button_timeout);
                    }
                }
                window.addEventListener("mousedown", e => {
                    onstart(e);
                });
                this.element.addEventListener("mouseup", onend);
                window.addEventListener("touchstart", e => {
                    onstart(e);
                });
                window.addEventListener("touchend", onend);
            }
        }

        class Moveset {
            constructor () {
                this.first_skill = new Skill(".ms-s0");
                this.second_skill = new Skill(".ms-s1");
                this.third_skill = new Skill(".ms-s2");
                this.fourt_skill = new Skill(".ms-s3");

                this.element = document.querySelector(".moveset");
            }

            show (fighter) {
                this.element.classList.remove("hidden");
                this.first_skill.update(fighter.skills_data.first.image, fighter.skills_data.first.type,
                    fighter.skills_data.first.desc);
                this.second_skill.update(fighter.skills_data.second.image, fighter.skills_data.second.type,
                    fighter.skills_data.first.desc);
                this.third_skill.update(fighter.skills_data.third.image, fighter.skills_data.third.type,
                    fighter.skills_data.first.desc);
                this.fourt_skill.update(fighter.skills_data.fourt.image, fighter.skills_data.fourt.type,
                    fighter.skills_data.first.desc);

                if (this.first_skill.is_selected || this.second_skill.is_selected
                    || this.third_skill.is_selected || this.fourt_skill.is_selected) {

                }
            }

            hide () {
                this.element.classList.add("hidden");
            }
        }

        class Battle {
            constructor () {
                this.allyteam_el = document.querySelector("#ally-team");
                this.enemyteam_el = document.querySelector("#enemy-team");
                this.round = 1;
                this.current_fighter_index = 0;

                //clean team elements
                this.allyteam_el.innerHTML = "";
                this.enemyteam_el.innerHTML = "";

                this.moveset = new Moveset();

                this.allyteam = new Team("ally", this.allyteam_el);
                this.enemyteam = new Team("enemy", this.enemyteam_el);
                this.fighters = Team.order_by_speed(this.allyteam.members.concat(this.enemyteam.members));
                console.log(this.allyteam);
                console.log(this.enemyteam);
                console.log(this.fighters);

                this.next_fighter_move();
            }

            next_fighter_move () {
                let current_fighter = this.fighters[this.current_fighter_index];
                current_fighter.focus();

                //moveset display and ally control or enemy ia trigger
                if (current_fighter.is_ally()) {
                    this.moveset.show(current_fighter);
                    return;
                } else {
                    this.moveset.hide();
                    current_fighter.automove();
                }

                this.current_fighter_index++;

                //triggers next when all players has move
                if (this.current_fighter_index == this.fighters.length) {
                    this.next_round();
                }

                current_fighter.blur();
                this.next_fighter_move();
            }

            next_round () {
                this.current_fighter_index = 0;
                this.round++;
            }
        }

        let battle = new Battle();
    }

    from_mainmenu_to_coregame();
    create_characters();
}