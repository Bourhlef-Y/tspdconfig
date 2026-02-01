Config = {}
Config.General = {
    parametres = {
        DrawDistance = 3.0,
        Debug = false,
        UseOxTarget = true
    }
}
Config.StaffAndAdmin = {
    staffGroups = {
        'admin',
        'moderator'
    },
    admin = {
        enabled = true,
        command = "jobadmin"
    }
}
Config.Notifications = {
    enabled = true,
    gradeChange = true,
    promotion = true,
    demotion = true,
    fire = true,
    recruit = true,
    sound = true,
    duration = 5000
}
Config.Jobs = {
    ['pn'] = {
        label = "Police Nationale",
        color = "#1e40af",
        whitelisted = false, 
        recruiterGrade = 1, 
        bossGrade = 2, 
        recruiterPoint = vector3(259.85, -1374.73, 30.56), 
        bossPoint = vector3(264.3, -1371.21, 34.04), 
        accueil = vector3(252.53, -1383.86, 30.56), 
        vestiaire = vector3(251.96, -1388.63, 37.72), 
        armurerie = vector3(266.75, -1371.74, 30.56), 
        garage = {
            spawn = vector4(252.28, -1376.35, 24.71, 145.51), 
            spawnPoint = vector4(233.43, -1376.73, 24.71, 235.8), 
            spawnPoints = {
                vector4(233.43, -1376.73, 24.71, 235.8),
            },
            deletePoint = vector3(247.23, -1406.73, 24.71),
            spawnCheckRadius = 3.0
        },
        weaponPacks = {
            [0] = {
                ["Police Secours"] = {
                    {name = "WEAPON_FLASHLIGHT", ammo = 1},
                    {name = "WEAPON_PISTOL", ammo = 45},
                    {name = "WEAPON_STUNGUN", ammo = 3},
                    {name = "WEAPON_COMBATPDW", ammo = 60},
                    {name = "WEAPON_FIREEXTINGUISHER", ammo = 1},
                    {name = "WEAPON_NIGHTSTICK", ammo = 1},
                    {name = "WEAPON_PEPPERSPRAY", ammo = 1},
                    {name = "WEAPON_LBD", ammo = 15}
                }
            },
            [1] = {
                ["BMO"] = {
                    {name = "WEAPON_FLASHLIGHT", ammo = 1},
                    {name = "WEAPON_PISTOL", ammo = 45},
                    {name = "WEAPON_STUNGUN", ammo = 3},
                    {name = "WEAPON_COMBATPDW", ammo = 60},
                    {name = "WEAPON_LBD2", ammo = 15},
                    {name = "WEAPON_PEPPERSPRAY", ammo = 1},
                    {name = "WEAPON_VINTAGEPISTOL", ammo = 30}
                }
            },
            [2] = {
                ["BAC"] = {
                    {name = "WEAPON_FLASHLIGHT", ammo = 1},
                    {name = "WEAPON_COMBATPISTOL", ammo = 45, components = {"COMPONENT_AT_PI_FLSH"}},
                    {name = "WEAPON_STUNGUN", ammo = 3},
                    {name = "WEAPON_SMG", ammo = 90},
                    {name = "WEAPON_PEPPERSPRAY", ammo = 1},
                    {name = "WEAPON_LBD2", ammo = 15},
                    {name = "WEAPON_NIGHTSTICK", ammo = 1}
                }
            },
            [3] = {
                ["CRS"] = {
                    {name = "WEAPON_FLASHLIGHT", ammo = 1},
                    {name = "WEAPON_PISTOL", ammo = 45},
                    {name = "WEAPON_STUNGUN", ammo = 3},
                    {name = "WEAPON_HEAVYSHOTGUN", ammo = 24},
                    {name = "WEAPON_NIGHTSTICK", ammo = 1},
                    {name = "WEAPON_PEPPERSPRAY", ammo = 1},
                    {name = "WEAPON_LGCOUGAR", ammo = 30},
                    {name = "WEAPON_LBD", ammo = 20}
                }
            },
            [4] = {
                ["BRI/RAID"] = {
                    {name = "WEAPON_FLASHLIGHT", ammo = 1},
                    {name = "WEAPON_COMBATPISTOL", ammo = 60, components = {"COMPONENT_AT_PI_FLSH"}},
                    {name = "WEAPON_STUNGUN", ammo = 3},
                    {name = "WEAPON_LBD", ammo = 20},
                    {name = "WEAPON_PEPPERSPRAY", ammo = 1},
                    {name = "WEAPON_CARBINERIFLE", ammo = 120, components = {"COMPONENT_AT_AR_FLSH"}},
                    {name = "WEAPON_PUMPSHOTGUN", ammo = 24, components = {"COMPONENT_AT_AR_FLSH"}}
                }
            }
        },
        vehicles = {
            ["[PS] Police Secours"] = {
                {label = "BMW R1200 RT", model = "bmr12pn"},
                {label = "Citroën C4", model = "citpn"},
                {label = "Peugeot 2008", model = "p2026pn"},
                {label = "Peugeot 5008", model = "p5008pn"},
                {label = "Peugeot 5008 (2)", model = "p5008pn2"},
                {label = "Peugeot Expert", model = "pexppn"},
                {label = "Renault Megane", model = "rmegpn"},
                {label = "Ford Focus", model = "ffocpn"},
                {label = "Peugeot 3008", model = "p3008pn"},
                {label = "Peugeot 308", model = "p308pn"},
                {label = "Renault Rifter", model = "rriftpn"},
                {label = "Renault Scenic", model = "rscenpn"},
                {label = "Skoda Kodiaq", model = "skkodpn"},
                {label = "Skoda Octavia", model = "skoctpn"},
            },
            ["[BAC] Brigade Anti-Criminalité"] = {
                {label = "Renault Megane", model = "rmegpnban"},
                {label = "Peugeot 308", model = "p308pnban"},
                {label = "Peugeot 508", model = "p508pnban"},
                {label = "Skoda Octavia", model = "skoctpnmar"},
                {label = "Renault Megane 4 Estate", model = "rmeg4epnban"},
                {label = "Renault Clio 4", model = "rclio4pnban"},
                {label = "Skoda Octavia", model = "skoctpnban"},
                {label = "VW Passat", model = "vwpaspnban"},
                {label = "Ford Mondeo ", model = "fmondeopnban"},
            },
            ["[BAC75N] BAC Nuit Paris"] = {
                {label = "Ford Mondeo", model = "fmonpn"},
                {label = "Renault Talisman", model = "rtalpn"},
                {label = "VW Golf", model = "vwgolfpn"},
            },
            ["[CRS] Compagnies Républicaines"] = {
                {label = "BMW R1200 RT", model = "bmr12pncrs"},
                {label = "BMW R1200 RT (E)", model = "bmr12pncrse"},
                {label = "Peugeot 5008", model = "p5008pncrs"},
                {label = "Peugeot 5008 (2)", model = "p5008pncrs2"},
                {label = "Renault Megane", model = "rmegpncrs"},
                {label = "Peugeot Expert", model = "pexppncrs"},
                {label = "Peugeot Expert MO", model = "pexppncrsmo"},
                {label = "Renault Master", model = "rmaspncrs"},
            },
            ["[BRI] Brigade de Recherche"] = {
                {label = "Ford Transit", model = "ft6pnbri"},
                {label = "Renault Master", model = "rmaspnbri"},
            },
            ["[RAID]"] = {
                {label = "Ford Transit", model = "ft6pnraid"},
                {label = "Peugeot Expert", model = "pexppnraid"},
            },
            ["[QP] Quartier Prioritaire"] = {
                {label = "Peugeot 5008", model = "p5008pnqp"},
            },
            ["[VTT] Vélo"] = {
                {label = "VTT Police", model = "veloPN"},
            },
        },
        peds = {
            accueil = {
                enabled = true,
                model = "s_f_y_cop_01",
                coords = vector4(253.37, -1384.88, 30.56, 129.75)
            },
            vestiaire = {
                enabled = false,
                model = "s_m_y_cop_01",
                coords = vector4(0.0, 0.0, 0.0, 0.0)
            },
            armurerie = {
                enabled = true,
                model = "s_m_y_cop_01",
                coords = vector4(267.4, -1372.56, 30.56, 52.39)
            },
            garage = {
                enabled = true,
                model = "s_m_y_cop_01",
                coords = vector4(252.29, -1376.35, 24.71, 145.51)
            },
            recruiterPoint = {
                enabled = false,
                model = "s_m_y_cop_01",
                coords = vector4(0.0, 0.0, 0.0, 0.0)
            },
            bossPoint = {
                enabled = false,
                model = "s_m_y_cop_01",
                coords = vector4(0.0, 0.0, 0.0, 0.0)
            }
        },
        uniforms = {
            [0] = {
                ["Police Secours"] = {
                    male = { 
                        ['undershirt'] = {id = 58, txt = 0}, 
                        ['jacket'] = {id = 55, txt = 0}, 
                        ['pants'] = {id = 24, txt = 0},
                        ['shoes'] = {id = 25, txt = 0},
                    },
                    female = { 
                        ['undershirt'] = {id = 35, txt = 0}, 
                        ['jacket'] = {id = 48, txt = 0}, 
                        ['pants'] = {id = 34, txt = 0},
                        ['shoes'] = {id = 25, txt = 0},
                    }
                }
            },
            [1] = {
                ["BMO"] = {
                    male = { ['undershirt'] = {id = 58, txt = 0}, ['jacket'] = {id = 55, txt = 0}, ['pants'] = {id = 24, txt = 0} },
                    female = { ['undershirt'] = {id = 35, txt = 0}, ['jacket'] = {id = 48, txt = 0}, ['pants'] = {id = 34, txt = 0} }
                },
                ["VTT"] = {
                    male = { ['undershirt'] = {id = 58, txt = 0}, ['jacket'] = {id = 55, txt = 0}, ['pants'] = {id = 24, txt = 0} },
                    female = { ['undershirt'] = {id = 35, txt = 0}, ['jacket'] = {id = 48, txt = 0}, ['pants'] = {id = 34, txt = 0} }
                }
            },
            [2] = {
                ["BAC"] = {
                    male = { ['undershirt'] = {id = 58, txt = 0}, ['jacket'] = {id = 55, txt = 0}, ['pants'] = {id = 24, txt = 0} },
                    female = { ['undershirt'] = {id = 35, txt = 0}, ['jacket'] = {id = 48, txt = 0}, ['pants'] = {id = 34, txt = 0} }
                },
                ["BAC75N"] = {
                    male = { ['undershirt'] = {id = 58, txt = 0}, ['jacket'] = {id = 55, txt = 0}, ['pants'] = {id = 24, txt = 0} },
                    female = { ['undershirt'] = {id = 35, txt = 0}, ['jacket'] = {id = 48, txt = 0}, ['pants'] = {id = 34, txt = 0} }
                },
            },
            [3] = {
                ["BRI"] = {
                    male = { ['undershirt'] = {id = 58, txt = 0}, ['jacket'] = {id = 55, txt = 0}, ['pants'] = {id = 24, txt = 0} },
                    female = { ['undershirt'] = {id = 35, txt = 0}, ['jacket'] = {id = 48, txt = 0}, ['pants'] = {id = 34, txt = 0} }
                },
                ["RAID"] = {
                    male = { ['undershirt'] = {id = 58, txt = 0}, ['jacket'] = {id = 55, txt = 0}, ['pants'] = {id = 24, txt = 0} },
                    female = { ['undershirt'] = {id = 35, txt = 0}, ['jacket'] = {id = 48, txt = 0}, ['pants'] = {id = 34, txt = 0} }
                },
            }
        },
        gradeImages = {
            [0] = "grades/police/1.egpx.png",
            [1] = "grades/police/2.gpxstg.png",
            [2] = "grades/police/3.gpx.png",
            [3] = "grades/police/4.brgch.png",
            [4] = "grades/police/5.mjr.png",
            [5] = "grades/police/6.ltn.png",
            [6] = "grades/police/7.cpt.png",
            [7] = "grades/police/8.cdt.png",
            [8] = "grades/police/9.com.png",
        }
    },
    ['gn'] = {
        label = "Gendarmerie Nationale",
        color = "#262f49",
        whitelisted = false,
        recruiterGrade = 9,
        bossGrade = 10,
        recruiterPoint = vector3(-3007.4516601562, 80.348564147949, 11.608128547668),
        bossPoint = vector3(-3005.1550292969, 79.429100036621, 11.608504295349),
        accueil = vector3(-3169.9519042969, 1083.7124023438, 20.848474502563),
        vestiaire = vector3(-3161.1379394531, 1054.2022705078, 20.851318359375),
        armurerie = vector3(-3185.2275390625, 1066.486328125, 20.848165512085),
        heliPoint = vector3(-743.26489257812, -1506.8903808594, 5.0005211830139),
        boatPoint = vector3(-804.60925292969, -1496.1822509766, 1.5952172279358),
        garage = {
           spawn = vector4(-3159.6140136719, 1118.2352294922, 20.844816207886, 65.462753295898),
           spawnPoints = {
           vector4(-3150.9169921875, 1126.3347167969, 20.556537628174, 68.463760375977),
           vector4(-3147.8088378906, 1133.0404052734, 20.555776596069, 69.281326293945)
           },
            deletePoint = vector3(-3178.3142089844, 1109.3587646484, 20.860746383667),
            heliSpawnPoints = {
                vector4(-745.56787109375, -1468.9829101562, 5.0005207061768, 3.4532940387726),
                vector4(-724.77905273438, -1443.9013671875, 5.0005207061768, 326.10784912109),
            },
            boatSpawnPoints = {
                vector4(-802.18090820312, -1498.8786621094, 0.11958599090576, 111.5704498291),
            },
            spawnCheckRadius = 3.0,
        },
        weaponPacks = {
            [0] = {
                ["GAV"] = {
                    {name = "WEAPON_FLASHLIGHT", ammo = 1},
                    {name = "WEAPON_PISTOL", ammo = 45, components = {"COMPONENT_AT_PI_FLSH"}},
                    {name = "WEAPON_STUNGUN", ammo = 3},
                    {name = "WEAPON_COMBATPDW", ammo = 60},
                    {name = "WEAPON_NIGHTSTICK", ammo = 1},
                    {name = "WEAPON_LBD", ammo = 15}
                }
            },
            [1] = {
                ["Sous-officiers"] = {
                    {name = "WEAPON_FLASHLIGHT", ammo = 1},
                    {name = "WEAPON_PISTOL", ammo = 45, components = {"COMPONENT_AT_PI_FLSH"}},
                    {name = "WEAPON_STUNGUN", ammo = 3},
                    {name = "WEAPON_SMG", ammo = 90, components = {"COMPONENT_AT_SCOPE_MACRO_02"}},
                    {name = "WEAPON_BULLPUPRIFLE", ammo = 90},
                    {name = "WEAPON_NIGHTSTICK", ammo = 1},
                    {name = "WEAPON_LBD", ammo = 15}
                }
            },
            [2] = {
                ["BMO"] = {
                    {name = "WEAPON_FLASHLIGHT", ammo = 1},
                    {name = "WEAPON_PISTOL", ammo = 45, components = {"COMPONENT_AT_PI_FLSH"}},
                    {name = "WEAPON_STUNGUN", ammo = 3},
                    {name = "WEAPON_NIGHTSTICK", ammo = 1},
                    {name = "WEAPON_PEPPERSPRAY", ammo = 1},
                    {name = "WEAPON_VINTAGEPISTOL", ammo = 30}
                },
                ["OPJ"] = {
                    {name = "WEAPON_FLASHLIGHT", ammo = 1},
                    {name = "WEAPON_COMBATPISTOL", ammo = 45, components = {"COMPONENT_AT_PI_FLSH"}},
                    {name = "WEAPON_NIGHTSTICK", ammo = 1}
                }
            },
            [3] = {
                ["PSIG"] = {
                    {name = "WEAPON_FLASHLIGHT", ammo = 1},
                    {name = "WEAPON_COMBATPISTOL", ammo = 45, components = {"COMPONENT_AT_PI_FLSH"}},
                    {name = "WEAPON_PUMPSHOTGUN", ammo = 24, components = {"COMPONENT_AT_AR_FLSH"}},
                    {name = "WEAPON_STUNGUN", ammo = 3},
                    {name = "WEAPON_SPECIALCARBINE", ammo = 90, components = {"COMPONENT_AT_AR_FLSH", "COMPONENT_AT_SCOPE_MEDIUM"}},
                    {name = "WEAPON_NIGHTSTICK", ammo = 1},
                    {name = "WEAPON_LBD", ammo = 20},
                    {name = "WEAPON_PEPPERSPRAY", ammo = 1}
                },
                ["ERI"] = {
                    {name = "WEAPON_FLASHLIGHT", ammo = 1},
                    {name = "WEAPON_PISTOL", ammo = 45, components = {"COMPONENT_AT_PI_FLSH"}},
                    {name = "WEAPON_STUNGUN", ammo = 3},
                    {name = "WEAPON_NIGHTSTICK", ammo = 1},
                    {name = "WEAPON_PEPPERSPRAY", ammo = 1},
                    {name = "WEAPON_LBD", ammo = 20},
                    {name = "WEAPON_SPECIALCARBINE", ammo = 90, components = {"COMPONENT_AT_AR_FLSH"}},
                    {name = "WEAPON_VINTAGEPISTOL", ammo = 30}
                }
            },
            [4] = {
                ["GM"] = {
                    {name = "WEAPON_FLASHLIGHT", ammo = 1},
                    {name = "WEAPON_COMBATPISTOL", ammo = 45, components = {"COMPONENT_AT_PI_FLSH"}},
                    {name = "WEAPON_STUNGUN", ammo = 3},
                    {name = "WEAPON_SPECIALCARBINE", ammo = 90, components = {"COMPONENT_AT_AR_FLSH"}},
                    {name = "WEAPON_HEAVYSHOTGUN", ammo = 24},
                    {name = "WEAPON_NIGHTSTICK", ammo = 1},
                    {name = "WEAPON_PEPPERSPRAY", ammo = 1},
                    {name = "WEAPON_LGCOUGAR", ammo = 30},
                    {name = "WEAPON_LBD", ammo = 20}
                }
            },
            [5] = {
                ["GIGN"] = {
                    {name = "WEAPON_FLASHLIGHT", ammo = 1},
                    {name = "WEAPON_COMBATPISTOL", ammo = 60, components = {"COMPONENT_AT_PI_FLSH"}},
                    {name = "WEAPON_STUNGUN", ammo = 3},
                    {name = "WEAPON_CARBINERIFLE", ammo = 120, components = {"COMPONENT_AT_AR_AFGRIP", "COMPONENT_AT_SCOPE_MEDIUM", "COMPONENT_AT_AR_FLSH"}},
                    {name = "WEAPON_PUMPSHOTGUN_MK2", ammo = 24, components = {"COMPONENT_AT_AR_FLSH"}},
                    {name = "WEAPON_SNIPERRIFLE", ammo = 30, components = {"COMPONENT_AT_SCOPE_MAX"}},
                    {name = "WEAPON_NIGHTSTICK", ammo = 1},
                    {name = "WEAPON_GRENADE_SMOKE", ammo = 5},
                    {name = "WEAPON_GRENADE_STUN", ammo = 5},
                    {name = "WEAPON_GRENADE_TEARGAS", ammo = 5},
                    {name = "WEAPON_FLASHBANG", ammo = 5}
                }
            }
        },
        vehicles = {
            ["[PAM] Patrouille"] = {
                {label = "Peugeot 5008", model = "p5008gnpam"},
                {label = "Peugeot Expert", model = "pexpgnpam"},
                {label = "Renault Kangoo", model = "rkangnpam"},
                {label = "Renault Megane 3", model = "rmeg3gnpam"},
                {label = "Renault Megane 4 Estate", model = "rmeg4egnpam"},
                {label = "Renault Rifter", model = "rriftgnpam"},
            },
            ["[BMO] Brigade Motorisée"] = {
                {label = "BMW R1200 RT", model = "bmr1200gnbmo"},
                {label = "Yamaha MT-09", model = "ymmt09gnbmo"},
            },
            ["[ERI] Escadron Rapide"] = {
                {label = "Alpine A110", model = "ralpgneri"},
                {label = "Renault Megane RS", model = "rmegrsgneri"},
            },
            ["[PSIG]"] = {
                {label = "Peugeot 308", model = "p308gnpsig"},
                {label = "Renault Talisman", model = "rtalgnpsig"},
            },
            ["[GM] Gendarmerie Mobile"] = {
                {label = "Ford Transit", model = "ft6gngm"},
                {label = "Iveco Daily", model = "ivivgngm"},
                {label = "Peugeot Boxer", model = "pboxgngm"},
                {label = "Renault Master", model = "rmasgngm"},
                {label = "VBRG", model = "vbrggngm"},
            },
            ["[GIGN]"] = {
                {label = "Ford Transit", model = "ft6gngign"},
            },
            ["[VTT] Vélo"] = {
                {label = "VTT Gendarmerie", model = "velogn"},
            },
        },
        heliVehicles = {
            ["FAGN"] = {
                {label = "EC135", model = "buzzard"},
                {label = "EC145", model = "akula"},
            },
        },
        boatVehicles = {
            ["Fluviale"] = {
                {label = "Zodiac", model = "dinghy"},
            },
        },
        peds = {
            accueil = {
                enabled = true,
                model = "s_f_y_cop_01",
                coords = vector4(-3170.0080566406, 1084.0064697266, 20.848173141479, 245.10333251953)
            },
            vestiaire = {
                enabled = false,
                model = "s_m_y_cop_01",
                coords = vector4(0.0, 0.0, 0.0, 0.0)
            },
            armurerie = {
                enabled = false,
                model = "s_m_y_cop_01",
                coords = vector4(0.0, 0.0, 0.0, 0.0)
            },
            garage = {
                enabled = true,
                model = "s_m_y_cop_01",
                coords = vector4(-3159.6140136719, 1118.2352294922, 20.844816207886, 65.462753295898)
            },
            recruiterPoint = {
                enabled = false,
                model = "s_m_y_cop_01",
                coords = vector4(0.0, 0.0, 0.0, 0.0)
            },
            bossPoint = {
                enabled = false,
                model = "s_m_y_cop_01",
                coords = vector4(0.0, 0.0, 0.0, 0.0)
            }
        },
        uniforms = {
            [0] = {
                ["Gendarme"] = {
                    male = { 
                        ['undershirt'] = {id = 58, txt = 0}, 
                        ['jacket'] = {id = 55, txt = 0}, 
                        ['pants'] = {id = 24, txt = 0},
                        ['shoes'] = {id = 25, txt = 0},
                    },
                    female = { 
                        ['undershirt'] = {id = 35, txt = 0}, 
                        ['jacket'] = {id = 48, txt = 0}, 
                        ['pants'] = {id = 34, txt = 0},
                        ['shoes'] = {id = 25, txt = 0},
                    }
                }
            },
            [1] = {
                ["BMO"] = {
                    male = { ['undershirt'] = {id = 58, txt = 0}, ['jacket'] = {id = 55, txt = 0}, ['pants'] = {id = 24, txt = 0} },
                    female = { ['undershirt'] = {id = 35, txt = 0}, ['jacket'] = {id = 48, txt = 0}, ['pants'] = {id = 34, txt = 0} }
                },
                ["VTT"] = {
                    male = { ['undershirt'] = {id = 58, txt = 0}, ['jacket'] = {id = 55, txt = 0}, ['pants'] = {id = 24, txt = 0} },
                    female = { ['undershirt'] = {id = 35, txt = 0}, ['jacket'] = {id = 48, txt = 0}, ['pants'] = {id = 34, txt = 0} }
                }
            },
            [2] = {
                ["BAC"] = {
                    male = { ['undershirt'] = {id = 58, txt = 0}, ['jacket'] = {id = 55, txt = 0}, ['pants'] = {id = 24, txt = 0} },
                    female = { ['undershirt'] = {id = 35, txt = 0}, ['jacket'] = {id = 48, txt = 0}, ['pants'] = {id = 34, txt = 0} }
                },
                ["BAC75N"] = {
                    male = { ['undershirt'] = {id = 58, txt = 0}, ['jacket'] = {id = 55, txt = 0}, ['pants'] = {id = 24, txt = 0} },
                    female = { ['undershirt'] = {id = 35, txt = 0}, ['jacket'] = {id = 48, txt = 0}, ['pants'] = {id = 34, txt = 0} }
                },
            },
            [3] = {
                ["BRI"] = {
                    male = { ['undershirt'] = {id = 58, txt = 0}, ['jacket'] = {id = 55, txt = 0}, ['pants'] = {id = 24, txt = 0} },
                    female = { ['undershirt'] = {id = 35, txt = 0}, ['jacket'] = {id = 48, txt = 0}, ['pants'] = {id = 34, txt = 0} }
                },
                ["RAID"] = {
                    male = { ['undershirt'] = {id = 58, txt = 0}, ['jacket'] = {id = 55, txt = 0}, ['pants'] = {id = 24, txt = 0} },
                    female = { ['undershirt'] = {id = 35, txt = 0}, ['jacket'] = {id = 48, txt = 0}, ['pants'] = {id = 34, txt = 0} }
                },
            }
        },
        gradeImages = {
            [0] = "grades/gendarmerie/g2c.png",
            [1] = "grades/gendarmerie/brg.png",
            [2] = "grades/gendarmerie/brgch.png",
            [3] = "grades/gendarmerie/gnd.png",
            [4] = "grades/gendarmerie/mdlc.png",
            [5] = "grades/gendarmerie/mdlch.png",
            [6] = "grades/gendarmerie/adj.png",
            [7] = "grades/gendarmerie/adc.png",
            [8] = "grades/gendarmerie/mjr.png",
            [9] = "grades/gendarmerie/slt.png",
            [10] = "grades/gendarmerie/ltn.png",
            [11] = "grades/gendarmerie/cpt.png",
            [12] = "grades/gendarmerie/cdt.png",
        }
    },
    ['samu'] = {
        label = "SAMU",
        color = "#d0ff00",
        whitelisted = false,
        recruiterGrade = 1,
        bossGrade = 2,
        recruiterPoint = vector3(-435.19979858398, -324.1872253418, 34.91072845459),
        bossPoint = vector3(-435.19979858398, -324.1872253418, 34.91072845459),
        accueil = vector3(-435.19979858398, -324.1872253418, 34.91072845459),
        vestiaire = vector3(-438.2294921875, -307.59155273438, 34.91051864624),
        armurerie = vector3(-452.03234863281, -324.81225585938, 34.910736083984),
        heliPoint = vector3(-448.93399047852, -328.4430847168, 78.164566040039),
        garage = {
            spawn = vector3(-510.78506469727, -340.84942626953, 34.385189056396),
            spawnPoint = vector4(-501.16159057617, -335.47659301758, 34.385196685791, 257.05895996094),
            deletePoint = vector3(-501.16235351562, -335.47579956055, 34.385196685791),
            heliSpawnPoints = {
                vector4(-447.40002441406, -312.62341308594, 78.164566040039, 21.473081588745),
                vector4(-456.15411376953, -291.33847045898, 78.164566040039, 22.732948303223)
            },
        },
        weaponPacks = {
            [0] = {
                ["Ambulancier"] = {
                    {name = "WEAPON_FLASHLIGHT", ammo = 1},
                }
            },
            [1] = {
                ["Infirmier"] = {
                    {name = "WEAPON_FLASHLIGHT", ammo = 1},
                }
            },
            [2] = {
                ["Médecin"] = {
                    {name = "WEAPON_FLASHLIGHT", ammo = 1},
                }
            }
        },
        vehicles = {
            ["[SMUR] Véhicules Légers"] = {
                {label = "Skoda Kodiaq SMUR", model = "skkodsmusmur"},
                {label = "Skoda Kodiaq SAMU 75", model = "skkodsmu75"},
            },
            ["[SAMU] Mercedes Sprinter"] = {
                {label = "Sprinter SAMU 75", model = "msprsmu75"},
                {label = "Sprinter SAMU 92", model = "msprsmu92"},
                {label = "Sprinter SAMU 94", model = "msprsmu94"},
            }
        },
        heliVehicles = { 
            ["[HELICO] Hélicoptère"] = {
                {label = "EC135 SAMU", model = "abec135smu"},
            },
        },
        peds = {
            accueil = {
                enabled = true,
                model = "s_m_m_doctor_01",
                coords = vector4(-435.19979858398, -324.1872253418, 34.91072845459, 166.45576477051)
            },
            vestiaire = {
                enabled = false,
                model = "s_m_m_doctor_01",
                coords = vector4(0.0, 0.0, 0.0, 0.0)
            },
            armurerie = {
                enabled = false,
                model = "s_m_m_doctor_01",
                coords = vector4(0.0, 0.0, 0.0, 0.0)
            },
            garage = {
                enabled = true,
                model = "s_m_m_doctor_01",
                coords = vector4(-510.78506469727, -340.84942626953, 34.385189056396, 265.84228515625)
            },
            recruiterPoint = {
                enabled = false,
                model = "s_m_m_doctor_01",
                coords = vector4(0.0, 0.0, 0.0, 0.0)
            },
            bossPoint = {
                enabled = false,
                model = "s_m_m_doctor_01",
                coords = vector4(0.0, 0.0, 0.0, 0.0)
            }
        },
        uniforms = {
            [0] = {
                ["Infirmier"] = {
                    male = { 
                        ['undershirt'] = {id = 58, txt = 0}, 
                        ['jacket'] = {id = 55, txt = 0}, 
                        ['pants'] = {id = 24, txt = 0},
                        ['shoes'] = {id = 25, txt = 0},
                    },
                    female = { 
                        ['undershirt'] = {id = 35, txt = 0}, 
                        ['jacket'] = {id = 48, txt = 0}, 
                        ['pants'] = {id = 34, txt = 0},
                        ['shoes'] = {id = 25, txt = 0},
                    }
                }
            },
            [1] = {
                ["BMO"] = {
                    male = { ['undershirt'] = {id = 58, txt = 0}, ['jacket'] = {id = 55, txt = 0}, ['pants'] = {id = 24, txt = 0} },
                    female = { ['undershirt'] = {id = 35, txt = 0}, ['jacket'] = {id = 48, txt = 0}, ['pants'] = {id = 34, txt = 0} }
                },
                ["VTT"] = {
                    male = { ['undershirt'] = {id = 58, txt = 0}, ['jacket'] = {id = 55, txt = 0}, ['pants'] = {id = 24, txt = 0} },
                    female = { ['undershirt'] = {id = 35, txt = 0}, ['jacket'] = {id = 48, txt = 0}, ['pants'] = {id = 34, txt = 0} }
                }
            },
            [2] = {
                ["BAC"] = {
                    male = { ['undershirt'] = {id = 58, txt = 0}, ['jacket'] = {id = 55, txt = 0}, ['pants'] = {id = 24, txt = 0} },
                    female = { ['undershirt'] = {id = 35, txt = 0}, ['jacket'] = {id = 48, txt = 0}, ['pants'] = {id = 34, txt = 0} }
                },
                ["BAC75N"] = {
                    male = { ['undershirt'] = {id = 58, txt = 0}, ['jacket'] = {id = 55, txt = 0}, ['pants'] = {id = 24, txt = 0} },
                    female = { ['undershirt'] = {id = 35, txt = 0}, ['jacket'] = {id = 48, txt = 0}, ['pants'] = {id = 34, txt = 0} }
                },
            },
            [3] = {
                ["BRI"] = {
                    male = { ['undershirt'] = {id = 58, txt = 0}, ['jacket'] = {id = 55, txt = 0}, ['pants'] = {id = 24, txt = 0} },
                    female = { ['undershirt'] = {id = 35, txt = 0}, ['jacket'] = {id = 48, txt = 0}, ['pants'] = {id = 34, txt = 0} }
                },
                ["RAID"] = {
                    male = { ['undershirt'] = {id = 58, txt = 0}, ['jacket'] = {id = 55, txt = 0}, ['pants'] = {id = 24, txt = 0} },
                    female = { ['undershirt'] = {id = 35, txt = 0}, ['jacket'] = {id = 48, txt = 0}, ['pants'] = {id = 34, txt = 0} }
                },
            }
        },
        gradeImages = {
        }
    },
    ['sp'] = {
        label = "Sapeurs Pompiers de Paris",
        color = "#ff4444",
        whitelisted = false,
        recruiterGrade = 1,
        bossGrade = 2,
        recruiterPoint = vector3(-322.98, -1257.03, 31.3),
        bossPoint = vector3(-315.53, -1380.01, 34.86),
        accueil = vector3(-312.95, -1370.41, 31.31),
        vestiaire = vector3(-319.06, -1371.67, 31.31),
        armurerie = vector3(-333.64, -1372.03, 31.31),
        garage = {
           spawn = vector4(-329.11468505859, -1366.2552490234, 31.306867599487, 1.6921052932739),
           spawnPoints = {
                vector4(-320.12850952148, -1363.9287109375, 30.542524337769, 271.36990356445),
                vector4(-320.56826782227, -1358.9583740234, 30.54524230957, 272.59939575195),
                vector4(-319.59707641602, -1354.1059570312, 30.544885635376, 270.87805175781),
                vector4(-321.00723266602, -1348.8714599609, 30.546207427979, 270.00131225586),
                vector4(-319.16036987305, -1344.0435791016, 30.544195175171, 271.32412719727),
                vector4(-320.38549804688, -1339.1372070312, 30.54571723938, 272.35046386719),
                vector4(-320.76092529297, -1333.9241943359, 30.5452003479, 271.50933837891),
                vector4(-319.71801757812, -1329.1583251953, 30.546552658081, 271.35821533203),
                vector4(-319.64398193359, -1324.0119628906, 30.545612335205, 270.94158935547),
                vector4(-319.45886230469, -1318.7127685547, 30.545078277588, 269.45803833008),
           },
            deletePoint = vector3(-342.75, -1358.58, 31.3),
        },
        weaponPacks = {
            [0] = {
                ["Sapeur"] = {
                    {name = "WEAPON_FLASHLIGHT", ammo = 1},
                    {name = "WEAPON_FIREEXTINGUISHER", ammo = 1},
                    {name = "WEAPON_HATCHET", ammo = 1}
                }
            },
            [1] = {
                ["Caporal"] = {
                    {name = "WEAPON_FLASHLIGHT", ammo = 1},
                    {name = "WEAPON_FIREEXTINGUISHER", ammo = 1},
                    {name = "WEAPON_HATCHET", ammo = 1},
                    {name = "WEAPON_CROWBAR", ammo = 1}
                }
            },
            [2] = {
                ["Sergent"] = {
                    {name = "WEAPON_FLASHLIGHT", ammo = 1},
                    {name = "WEAPON_FIREEXTINGUISHER", ammo = 1},
                    {name = "WEAPON_HATCHET", ammo = 1},
                    {name = "WEAPON_CROWBAR", ammo = 1}
                }
            },
            [3] = {
                ["Officier"] = {
                    {name = "WEAPON_FLASHLIGHT", ammo = 1},
                    {name = "WEAPON_FIREEXTINGUISHER", ammo = 1},
                    {name = "WEAPON_HATCHET", ammo = 1}
                }
            }
        },
        vehicles = {
            ["[VSAV] Ambulances"] = {
                {label = "VSAV", model = "vsavsp3"},
                {label = "VSAV Cube", model = "vsavcubesp"},
            },
            ["[FPT] Fourgon Pompe"] = {
                {label = "FPT", model = "fptsp"},
                {label = "FPT LD", model = "fptspld"},
            },
            ["[CCF] Feux de Forêt"] = {
                {label = "CCF", model = "ccfsp"},
                {label = "CCFL", model = "ccflsp"},
            },
            ["[VL] Véhicules Légers"] = {
                {label = "VLCG", model = "vlcgsp"},
                {label = "VLM", model = "vlmsp"},
                {label = "Kangoo VLCG", model = "rkanspvlcg"},
                {label = "Duster", model = "ddustsp"},
            },
            ["[ENGINS] Engins Spéciaux"] = {
                {label = "EPA (Echelle)", model = "epansp"},
                {label = "FA (Fourgon Auto)", model = "fasp"},
                {label = "FSR", model = "fsrsp"},
                {label = "BUS SP", model = "bussp"},
                {label = "PS", model = "pssp"},
                {label = "VPC", model = "vpcsp"},
                {label = "PC", model = "dlodspamb"},
                {label = "VPS", model = "vpssp"},
                {label = "VSM", model = "vsmsp"},
                {label = "VTU", model = "vtusp2"},
                {label = "Véhicule Grimp", model = "vgrimpsp3"},
            },
        },
        peds = {
            accueil = {
                enabled = true,
                model = "s_m_y_fireman_01",
                coords = vector4(-312.95, -1370.41, 31.31, 280.89)
            },
            vestiaire = {
                enabled = false,
                model = "s_m_y_fireman_01",
                coords = vector4(0.0, 0.0, 0.0, 0.0)
            },
            armurerie = {
                enabled = false,
                model = "s_m_y_fireman_01",
                coords = vector4(0.0, 0.0, 0.0, 0.0)
            },
            garage = {
                enabled = true,
                model = "s_m_y_fireman_01",
                coords = vector4(-329.28, -1366.76, 31.31, 14.76)
            },
            recruiterPoint = {
                enabled = false,
                model = "s_m_y_fireman_01",
                coords = vector4(0.0, 0.0, 0.0, 0.0)
            },
            bossPoint = {
                enabled = false,
                model = "s_m_y_fireman_01",
                coords = vector4(0.0, 0.0, 0.0, 0.0)
            }
        },
        uniforms = {
            [0] = {
                ["Sapeur"] = {
                    male = {
                        ['undershirt'] = {id = 58, txt = 0},
                        ['jacket'] = {id = 55, txt = 0},
                        ['pants'] = {id = 24, txt = 0},
                        ['shoes'] = {id = 25, txt = 0}
                    },
                    female = {
                        ['undershirt'] = {id = 35, txt = 0},
                        ['jacket'] = {id = 48, txt = 0},
                        ['pants'] = {id = 34, txt = 0},
                        ['shoes'] = {id = 25, txt = 0}
                    }
                }
            }
        },
        gradeImages = {}
    },
    ['dir'] = {
        label = "Direction des Routes",
        color = "#ff8c00",
        whitelisted = false,
        recruiterGrade = 1,
        bossGrade = 2,
        recruiterPoint = vector3(2877.08, 4387.31, 50.42), 
        bossPoint = vector3(2859.24, 4400.42, 50.43), 
        accueil = vector3(2871.25, 4392.27, 50.42), 
        vestiaire = vector3(2865.01, 4384.07, 50.42),
        armurerie = vector3(2910.4682617188, 4370.4462890625, 50.365020751953),
        garage = {
            spawn = vector4(2908.94, 4377.99, 50.36, 0.84),
            spawnPoints = {
                vector4(2881.126953125, 4380.4204101562, 49.98413848877, 207.31039428711),
                vector4(2877.9675292969, 4378.7866210938, 49.987632751465, 207.46153259277),
                vector4(2875.5275878906, 4377.0454101562, 49.968647003174, 205.5043182373),
                vector4(2872.5478515625, 4375.7412109375, 49.968414306641, 204.61114501953),
                vector4(2869.6564941406, 4374.3764648438, 49.898551940918, 205.83796691895), 
            },
            deletePoint = vector3(2869.71, 4374.15, 50.31),
            spawnCheckRadius = 3.0,
        },
        weaponPacks = {
            [0] = {
                ["Agent DIR"] = {
                    {name = "weapon_hammer", ammo = 1},
                    {name = "weapon_crowbar", ammo = 1},
                    {name = "WEAPON_FLASHLIGHT", ammo = 1},
                    {name = "WEAPON_FIREEXTINGUISHER", ammo = 1}
                }
            }
        },
        vehicles = {
            ["[DIR] Véhicules d'Intervention"] = {
                {label = "Renault Master - Patrouilleur N°1", model = "rmasdirar"},
                {label = "Renault Master - Patrouilleur N°2", model = "rmasdirar2"},
                {label = "Renault Master - Service N°1", model = "rmasdirin"},
                {label = "Renault Master - Service N°2", model = "rmasdirin2"},
            },
        },
        peds = {
            accueil = {
                enabled = true,
                model = "s_m_y_construct_02",
                coords = vector4(2871.2277832031, 4392.6611328125, 50.420467376709, 31.925228118896)
            },
            vestiaire = {
                enabled = true,
                model = "s_m_y_construct_02",
                coords = vector4(2909.5825195312, 4377.8017578125, 50.364768981934, 22.679977416992)
            },
            armurerie = {
                enabled = false,
                model = "s_m_y_construct_02",
                coords = vector4(0.0, 0.0, 0.0, 0.0)
            },
            garage = {
                enabled = true,
                model = "s_m_y_construct_02",
                coords = vector4(-329.28, -1366.76, 31.31, 14.76)
            },
            recruiterPoint = {
                enabled = false,
                model = "s_m_y_construct_02",
                coords = vector4(0.0, 0.0, 0.0, 0.0)
            },
            bossPoint = {
                enabled = false,
                model = "s_m_y_construct_02",
                coords = vector4(0.0, 0.0, 0.0, 0.0)
            }
        },
        uniforms = {
            [0] = {
                ["Agent DIR"] = {
                    male = {
                        ['undershirt'] = {id = 15, txt = 0},
                        ['jacket'] = {id = 334, txt = 2},
                        ['pants'] = {id = 0, txt = 0},
                        ['shoes'] = {id = 0, txt = 0},
                    },
                    female = {
                        ['undershirt'] = {id = 0, txt = 0},
                        ['jacket'] = {id = 0, txt = 0},
                        ['pants'] = {id = 0, txt = 0},
                        ['shoes'] = {id = 0, txt = 0},
                    }
                }
            }
        },
        gradeImages = {}
    }
}